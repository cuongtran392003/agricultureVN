import { Colors } from "@/constant/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface ChatInputProps {
  onSend: (text: string) => void;
}

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    }
  };

  return (
    <View
      className="flex-row items-center px-[12px] py-[10px] gap-2"
      style={{
        backgroundColor: Colors.offwhite,
        borderTopWidth: 1,
        borderTopColor: Colors.lightgray,
      }}
    >
      {/* Mic button */}
      <TouchableOpacity
        className="w-[40px] h-[40px] rounded-full items-center justify-center"
        style={{ backgroundColor: "#E8F5E9" }}
      >
        <Ionicons name="mic-outline" size={22} color={Colors.forestgreen} />
      </TouchableOpacity>

      {/* Text input */}
      <View
        className="flex-1 flex-row items-center rounded-full px-[14px]"
        style={{
          backgroundColor: "#F5F3F0",
          height: 44,
        }}
      >
        <TextInput
          className="flex-1 text-[14px]"
          placeholder="Nhập câu hỏi của bạn..."
          placeholderTextColor={Colors.softsoil}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSend}
          returnKeyType="send"
          style={{ color: Colors.mediumtaupe }}
        />
      </View>

      {/* Send button */}
      <TouchableOpacity
        onPress={handleSend}
        className="w-[40px] h-[40px] rounded-full items-center justify-center"
        style={{
          backgroundColor: text.trim()
            ? Colors.brandorange
            : Colors.lightgray,
        }}
      >
        <FontAwesome
          name="send"
          size={16}
          color={text.trim() ? Colors.offwhite : Colors.softsoil}
        />
      </TouchableOpacity>
    </View>
  );
};
