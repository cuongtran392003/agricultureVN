import { Colors } from "@/constant/Colors";
import { useTranslation } from "@/i18n";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
export const ChatInput = ({ onSend }: { onSend: (text: string) => void }) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const send = () => { if (!text.trim()) return; onSend(text.trim()); setText(""); };
  return <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 12, paddingHorizontal: 20, paddingVertical: 14, backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.border }}>
    <TextInput accessibilityLabel={t("Câu hỏi cho trợ lý")} value={text} onChangeText={setText} multiline placeholder={t("Bạn muốn hỏi điều gì về mùa vụ?")} placeholderTextColor={Colors.textSecondary} style={{ flex: 1, minHeight: 52, maxHeight: 140, paddingHorizontal: 16, paddingVertical: 15, fontSize: 15, color: Colors.textPrimary, backgroundColor: Colors.offwhite, borderWidth: 1, borderColor: Colors.border, borderRadius: 18 }} />
    <TouchableOpacity accessibilityLabel={t("Gửi câu hỏi")} accessibilityRole="button" disabled={!text.trim()} onPress={send} style={{ width: 52, height: 52, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: text.trim() ? Colors.forestgreen : Colors.lightgray }}><Ionicons name="arrow-up" size={25} color={text.trim() ? "white" : Colors.textSecondary} /></TouchableOpacity>
  </View>;
};
