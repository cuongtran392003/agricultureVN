import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { english } from "./catalog";

export type Language = "vi" | "en";
export const useLanguageStore = create<{ language: Language; setLanguage: (language: Language) => void }>()(
  persist((set) => ({ language: "vi", setLanguage: language => set({ language }) }), {
    name: "app-language",
    storage: createJSONStorage(() => AsyncStorage),
    partialize: state => ({ language: state.language }),
    merge: (saved, current) => {
      const language = (saved as { language?: unknown } | undefined)?.language;
      return { ...current, language: language === "en" ? "en" : "vi" };
    },
  }),
);

const patterns: [RegExp, (...values: string[]) => string][] = [
  [/^Xin chào, (.+)$/, name => `Hello, ${name}`],
  [/^Tháng (\d+)(?:, (\d+))?$/, (month, year) => `${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][Number(month) - 1]}${year ? ` ${year}` : ""}`],
  [/^(\d+) \/ (\d+) việc đã hoàn thành$/, (done, total) => `${done} / ${total} tasks completed`],
  [/^Đang chọn (.+)$/, date => `Selected ${date}`],
  [/^Bạn có (\d+) công việc cần chăm sóc hôm nay\.$/, count => `You have ${count} tasks to do today.`],
  [/^(\d+) việc đã xong · (\d+) việc đang chờ$/, (done, pending) => `${done} done · ${pending} pending`],
  [/^(\d+) việc chờ làm · (\d+) việc đã xong$/, (pending, done) => `${pending} pending · ${done} done`],
  [/^Độ ẩm (.+)%$/, humidity => `Humidity ${humidity}%`],
  [/^Gió (.+) km\/h$/, wind => `Wind ${wind} km/h`],
  [/^Cập nhật (.+) · (\d+) nông sản$/, (time, count) => `Updated ${time} · ${count} crops`],
];
export const translate = (message: string, language = useLanguageStore.getState().language): string => {
  if (language === "vi") return message;
  const leading = message.match(/^\s*/)?.[0] ?? "";
  const trailing = message.match(/\s*$/)?.[0] ?? "";
  const key = message.trim().replace(/\s+/g, " ");
  if (english[key]) return leading + english[key] + trailing;
  for (const [pattern, render] of patterns) {
    const match = key.match(pattern);
    if (match) return leading + render(...match.slice(1)) + trailing;
  }
  return message;
};
export const useTranslation = () => {
  const language = useLanguageStore(state => state.language);
  return { language, t: (message: string) => translate(message, language) };
};
