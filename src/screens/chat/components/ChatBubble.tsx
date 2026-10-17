import { Colors } from "@/constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
export interface ChatMessage { id: string; text: string; sender: "ai" | "user"; time: string }
export const ChatBubble = ({ message }: { message: ChatMessage }) => {
  const isAI = message.sender === "ai";
  return <View style={{ paddingHorizontal: 20, marginBottom: 20, alignItems: isAI ? "flex-start" : "flex-end" }}>
    {isAI ? <View style={{ flexDirection: "row", gap: 6, alignItems: "center", marginBottom: 8 }}><Ionicons name="leaf-outline" size={15} color={Colors.leafgreen} /><Text style={{ color: Colors.leafgreen, fontSize: 11, fontWeight: "800" }}>TRỢ LÝ CANH TÁC</Text></View> : null}
    <View style={{ maxWidth: isAI ? "100%" : "88%", padding: 18, borderRadius: 22, borderBottomRightRadius: isAI ? 22 : 5, borderTopLeftRadius: isAI ? 5 : 22, backgroundColor: isAI ? Colors.surface : Colors.forestgreen, borderWidth: isAI ? 1 : 0, borderColor: Colors.border }}><Text localize={false} selectable style={{ fontSize: 15, lineHeight: 24, color: isAI ? Colors.textPrimary : "white" }}>{message.text}</Text></View>
    <Text style={{ color: Colors.textSecondary, fontSize: 10, marginTop: 6 }}>{message.time}</Text>
  </View>;
};
