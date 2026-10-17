import { useLanguageStore } from "@/i18n";
import { requireOptionalNativeModule } from "expo";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, Platform } from "react-native";

type SpeechModule = typeof import("expo-speech-recognition").ExpoSpeechRecognitionModule;
const getRecognition = (): SpeechModule | null => {
  try {
    if (Platform.OS !== "web" && !requireOptionalNativeModule("ExpoSpeechRecognition")) return null;
    // Load only after checking the native module so Expo Go can use keyboard entry.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("expo-speech-recognition").ExpoSpeechRecognitionModule;
  } catch { return null; }
};

export const useVoiceTask = () => {
  const language = useLanguageStore(state => state.language);
  const [listening, setListening] = useState(false);
  const [starting, setStarting] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const module = useRef<SpeechModule | null>(null);
  const listeners = useRef<{ remove: () => void }[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const generation = useRef(0);
  const active = useRef(false);
  const release = useCallback(() => {
    generation.current++;
    active.current = false;
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    try { module.current?.abort(); } catch { /* No active recognizer. */ }
    listeners.current.forEach(listener => listener.remove());
    listeners.current = [];
  }, []);
  useFocusEffect(useCallback(() => () => {
    release();
    setListening(false);
    setStarting(false);
  }, [release]));
  useEffect(() => {
    const listener = AppState.addEventListener("change", state => {
      // iOS permission dialogs temporarily make the app inactive.
      if (state === "background") { release(); setListening(false); setStarting(false); }
    });
    return () => { listener.remove(); release(); };
  }, [release]);

  const start = async () => {
    if (active.current) return;
    release();
    const session = generation.current;
    const recognition = getRecognition();
    if (!recognition || !recognition.isRecognitionAvailable()) {
      setError("Thiết bị chưa hỗ trợ nhận dạng giọng nói. Bạn có thể nhập bằng bàn phím.");
      return;
    }
    module.current = recognition;
    active.current = true;
    setStarting(true);
    setError("");
    try {
      const permission = await recognition.requestPermissionsAsync();
      if (session !== generation.current) return;
      if (!permission.granted) {
        active.current = false;
        setError("Cho phép micro và nhận dạng giọng nói để nhập công việc.");
        return;
      }
      setTranscript("");
      listeners.current = [
        recognition.addListener("start", () => { if (session !== generation.current) return; setStarting(false); setListening(true); }),
        recognition.addListener("result", event => {
          if (session !== generation.current) return;
          const text = event.results[0]?.transcript;
          if (text) setTranscript(text);
        }),
        recognition.addListener("end", () => {
          if (session !== generation.current) return;
          active.current = false;
          setListening(false); setStarting(false);
          if (timer.current) clearTimeout(timer.current);
          timer.current = null;
        }),
        recognition.addListener("error", event => {
          if (session !== generation.current) return;
          active.current = false;
          if (timer.current) clearTimeout(timer.current);
          timer.current = null;
          setListening(false); setStarting(false);
          if (event.error !== "aborted") setError(event.error === "no-speech"
            ? "Không nghe rõ. Vui lòng thử nói lại."
            : "Không thể nhận dạng giọng nói. Kiểm tra kết nối và thử lại.");
        }),
      ];
      recognition.start({ lang: language === "vi" ? "vi-VN" : "en-US", interimResults: true, continuous: false, maxAlternatives: 1, contextualStrings: ["tưới nước", "bón phân", "làm cỏ", "cà phê", "sầu riêng"] });
      timer.current = setTimeout(() => {
        release(); setListening(false); setStarting(false);
      }, 45000);
    } catch {
      release();
      setStarting(false);
      setListening(false);
      setError("Không thể nhận dạng giọng nói. Kiểm tra kết nối và thử lại.");
    } finally {
      if (session === generation.current) setStarting(false);
    }
  };
  const stop = () => {
    // Keep the session active until the final result/end event arrives.
    try { module.current?.stop(); } catch { release(); setListening(false); setStarting(false); }
  };
  return { listening, starting, transcript, setTranscript, error, start, stop };
};
