import { Colors } from "@/constant/Colors";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

interface EmptyStateProps {
  iconName?: keyof typeof FontAwesome.glyphMap;
  title: string;
  description: string;
  buttonText?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  iconName = "inbox",
  title,
  description,
  buttonText,
  onAction,
}: EmptyStateProps) => {
  return (
    <Animated.View
      entering={FadeInUp.delay(200).springify()}
      className="flex-1 items-center justify-center p-8 mt-10"
    >
      <View
        className="w-[120px] h-[120px] rounded-[30px] items-center justify-center mb-6"
        style={{
          backgroundColor: "#F2F7F4",
          transform: [{ rotate: "-5deg" }],
        }}
      >
        <FontAwesome name={iconName} size={56} color={Colors.forestgreen} />
      </View>
      <Text
        className="text-[20px] font-bold text-center mb-2"
        style={{ color: Colors.brownearth }}
      >
        {title}
      </Text>
      <Text className="text-[14px] text-center text-gray-500 mb-8 px-4 leading-5">
        {description}
      </Text>
      {buttonText && onAction && (
        <TouchableOpacity
          onPress={onAction}
          className="px-8 py-4 rounded-2xl"
          style={{
            backgroundColor: Colors.forestgreen,
            shadowColor: Colors.deepbark,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation: 4,
          }}
        >
          <Text className="text-white font-bold text-[16px]">
            {buttonText}
          </Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};
