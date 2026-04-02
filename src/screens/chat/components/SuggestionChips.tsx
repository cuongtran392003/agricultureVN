import { Colors } from "@/constant/Colors";
import { ScrollView, Text, TouchableOpacity } from "react-native";

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (text: string) => void;
}

export const SuggestionChips = ({
  suggestions,
  onSelect,
}: SuggestionChipsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 8,
      }}
    >
      {suggestions.map((text, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelect(text)}
          className="px-[14px] py-[8px] rounded-full"
          style={{
            backgroundColor: "#E8F5E9",
            borderWidth: 1,
            borderColor: Colors.forestgreen,
          }}
        >
          <Text
            className="text-[12px] font-semibold"
            style={{ color: Colors.forestgreen }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
