import { Colors } from "@/constant/Colors";
import { Language, useLanguageStore } from "@/i18n";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { FormModal } from "./FormModal";
import { LocalizedText as Text } from "./LocalizedText";

export const LanguagePicker = () => {
  const language = useLanguageStore(state => state.language);
  const setLanguage = useLanguageStore(state => state.setLanguage);
  const [visible, setVisible] = useState(false);
  return <>
    <Pressable cssInterop={false} onPress={() => setVisible(true)} accessibilityRole="button" style={({ pressed }) => ({ padding: 16, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: pressed ? Colors.surfaceMuted : "white" })}>
      <View style={{ width: 40, height: 40, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: Colors.forestgreen }}><Ionicons name="language-outline" size={21} color="white" /></View>
      <View style={{ flex: 1 }}><Text style={{ color: Colors.textPrimary, fontSize: 14, fontWeight: "700" }}>Ngôn ngữ</Text><Text localize={false} style={{ color: Colors.textSecondary, fontSize: 12, marginTop: 4 }}>{language === "vi" ? "Tiếng Việt" : "English"}</Text></View>
      <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
    </Pressable>
    <FormModal visible={visible} onClose={() => setVisible(false)} title="Chọn ngôn ngữ">
      <Text style={{ color: Colors.textSecondary, fontSize: 13, lineHeight: 20, marginBottom: 16 }}>Ngôn ngữ hiển thị và giọng nói</Text>
      {([{ value: "vi", label: "Tiếng Việt", subtitle: "Vietnamese" }, { value: "en", label: "English", subtitle: "Tiếng Anh" }] as const).map(item => <Pressable cssInterop={false} key={item.value} accessibilityRole="radio" accessibilityState={{ checked: language === item.value }} onPress={() => { setLanguage(item.value as Language); setVisible(false); }} style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 12, padding: 18, borderRadius: 17, marginBottom: 10, borderWidth: 1.5, borderColor: language === item.value ? Colors.leafgreen : Colors.border, backgroundColor: pressed || language === item.value ? Colors.surfaceMuted : "white" })}>
        <View style={{ flex: 1 }}><Text localize={false} style={{ fontWeight: "800", fontSize: 17, color: Colors.textPrimary }}>{item.label}</Text><Text localize={false} style={{ marginTop: 4, fontSize: 12, color: Colors.textSecondary }}>{item.subtitle}</Text></View>
        <Ionicons name={language === item.value ? "checkmark-circle" : "ellipse-outline"} size={24} color={Colors.leafgreen} />
      </Pressable>)}
    </FormModal>
  </>;
};
