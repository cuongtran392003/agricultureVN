import { Colors } from "@/constant/Colors";
import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ManageModalProps = {
  visible: boolean;
  onClose?: () => void;
  title: string;
  rightAction?: React.ReactNode;
  children: React.ReactNode;
};

export const ManageModal = ({
  visible,
  onClose,
  title,
  rightAction,
  children,
}: ManageModalProps) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
        <View className="bg-white py-4 px-4 shadow-sm z-10 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            {onClose && (
              <TouchableOpacity
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  onClose();
                }}
                className="p-2 -ml-2 mr-1"
              >
                <FontAwesome name="close" size={24} color={Colors.brownearth} />
              </TouchableOpacity>
            )}
            <Text className="text-[22px] font-bold text-gray-800">{title}</Text>
          </View>

          <View>{rightAction}</View>
        </View>

        <View style={{ flex: 1 }}>{children}</View>
      </SafeAreaView>
    </Modal>
  );
};
