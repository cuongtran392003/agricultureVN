import { Colors } from "@/constant/Colors";
import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type FormModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export const FormModal = ({
  visible,
  onClose,
  title,
  children,
}: FormModalProps) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-[24px] p-6" style={{ maxHeight: "90%" }}>
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-[20px] font-bold text-gray-800">
                {title}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  onClose();
                }}
              >
                <FontAwesome name="close" size={24} color={Colors.brownearth} />
              </TouchableOpacity>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {children}
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
