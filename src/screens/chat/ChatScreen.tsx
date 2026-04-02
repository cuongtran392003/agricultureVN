import { useCallback, useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatBubble, ChatMessage } from "./components/ChatBubble";
import { ChatHeader } from "./components/ChatHeader";
import { ChatInput } from "./components/ChatInput";
import { SuggestionChips } from "./components/SuggestionChips";

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    text: "Chào bác nông dân! Tôi là trợ lý AI chuyên về kỹ thuật canh tác. Tôi có thể giúp gì cho mùa vụ của mình hôm nay không ạ?",
    sender: "ai",
    time: "08:30 AM",
  },
  {
    id: "2",
    text: "Làm sao ép sầu riêng đậu trái tốt trong mùa mưa này?",
    sender: "user",
    time: "08:32 AM",
  },
  {
    id: "3",
    text: "Để sầu riêng đậu trái tốt, bác cần lưu ý 3 điểm chính sau:\n\n• Bón bmsưng Bo và Canxi trước khi hoa nở 10-15 ngày.\n\n• Hạn chế tưới ngọc quá nhiều khi hoa đang nở rĩ.\n\n• Phòng trừ nấm bệnh gây thối hoa bằng các hoạt chất sinh học.",
    sender: "ai",
    time: "Vừa xong",
  },
];

const suggestions = [
  "Kỹ thuật bón phân sầu riêng",
  "Cách trị gỉ sắt cà phê",
  "Phòng bệnh cho lúa",
  "Lịch chăm sóc bưởi",
];

export const ChatScreen = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = useCallback(
    (text: string) => {
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        text,
        sender: "user",
        time: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, userMsg]);

      // Simulate AI response
      setTimeout(() => {
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: "Cảm ơn bác đã hỏi! Tôi đang phân tích câu hỏi của bác. Vui lòng đợi trong giây lát...",
          sender: "ai",
          time: "Vừa xong",
        };
        setMessages((prev) => [...prev, aiMsg]);
      }, 1000);
    },
    []
  );

  const handleSuggestion = useCallback(
    (text: string) => {
      handleSend(text);
    },
    [handleSend]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F6F3" }}>
      <ChatHeader />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatBubble message={item} />}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Suggestion chips */}
        <SuggestionChips
          suggestions={suggestions}
          onSelect={handleSuggestion}
        />

        {/* Input bar */}
        <ChatInput onSend={handleSend} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};