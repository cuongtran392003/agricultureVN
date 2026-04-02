import { Colors } from "@/constant/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { ICONS } from "assets/icons";
import { Image, Text, View } from "react-native";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "ai" | "user";
  time: string;
}

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isAI = message.sender === "ai";

  return (
    <View
      className={`flex-row mb-4 px-[16px] ${isAI ? "" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      <View
        className={`w-[36px] h-[36px] rounded-full items-center justify-center ${
          isAI ? "mr-2" : "ml-2"
        }`}
        style={{
          backgroundColor: isAI ? Colors.forestgreen : Colors.lightgray,
        }}
      >
        {isAI ? (
          <FontAwesome name="leaf" size={16} color={Colors.offwhite} />
        ) : (
          <Image
            source={ICONS.iconAvatar}
            className="w-full h-full rounded-full"
          />
        )}
      </View>

      {/* Bubble */}
      <View className={`flex-1 ${isAI ? "pr-10" : "pl-10"}`}>
        {/* Sender label */}
        <Text
          className="font-bold text-[11px] mb-1"
          style={{ color: Colors.softsoil, textAlign: isAI ? "left" : "right" }}
        >
          {isAI ? "CHUYÊN GIA AI" : "TÔI"}
        </Text>

        {/* Message bubble */}
        <View
          className={`rounded-[16px] px-[14px] py-[10px] ${
            isAI ? "rounded-tl-[4px]" : "rounded-tr-[4px]"
          }`}
          style={{
            backgroundColor: isAI ? "#E8F5E9" : Colors.forestgreen,
          }}
        >
          <Text
            className="text-[14px] leading-[21px]"
            style={{ color: isAI ? Colors.mediumtaupe : Colors.offwhite }}
          >
            {message.text}
          </Text>
        </View>

        {/* Timestamp */}
        <Text
          className="text-[10px] mt-1"
          style={{
            color: Colors.softsoil,
            textAlign: isAI ? "left" : "right",
          }}
        >
          {message.time}
        </Text>
      </View>
    </View>
  );
};
