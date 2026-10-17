import { AppHeader } from "./AppHeader";
import { Colors } from "@/constant/Colors";
import { ReactNode } from "react";
import { KeyboardAvoidingView, Modal, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type Props = { visible: boolean; onClose: () => void; title: string; subtitle?: string; children: ReactNode };
export const FormModal = ({ visible, onClose, title, subtitle = "Điền thông tin và lưu thay đổi", children }: Props) => {
  const insets = useSafeAreaInsets();
  return <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(16,41,30,0.45)" }}>
        <View style={{ maxHeight: "92%", backgroundColor: Colors.surface, borderTopLeftRadius: 30, borderTopRightRadius: 30, overflow: "hidden" }}>
          <View style={{ width: 44, height: 5, borderRadius: 4, backgroundColor: Colors.border, alignSelf: "center", marginTop: 12 }} />
          <AppHeader title={title} subtitle={subtitle} onBack={onClose} />
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 22, paddingBottom: Math.max(insets.bottom, 20) + 16 }}>{children}</ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  </Modal>;
};
