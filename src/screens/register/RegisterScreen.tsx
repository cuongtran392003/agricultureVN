import { Colors } from "@/constant/Colors";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { RegisterHeader } from "./components/RegisterHeader";
import { RegisterForm } from "./components/RegisterForm";

export const RegisterScreen = () => {
  const router = useRouter();
  return <SafeAreaView style={{ flex: 1, backgroundColor: Colors.offwhite }}>
    <RegisterHeader />
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 20, paddingBottom: 36 }}>
        <View style={{ backgroundColor: Colors.forestgreen, padding: 24, borderRadius: 26, marginBottom: 20 }}>
          <Text style={{ color: "#C8DDCF", fontSize: 12, letterSpacing: 1.4, fontWeight: "700" }}>CHĂM VƯỜN CÙNG BẠN</Text>
          <Text style={{ color: "white", fontSize: 27, fontWeight: "800", marginTop: 10 }}>Khởi đầu mùa vụ mới</Text>
          <Text style={{ color: "#C8DDCF", fontSize: 14, lineHeight: 22, marginTop: 10 }}>Tạo tài khoản để quản lý công việc và theo dõi vườn của bạn.</Text>
        </View>
        <View style={{ backgroundColor: Colors.surface, borderRadius: 26, padding: 22 }}>
          <Text style={{ color: Colors.textPrimary, fontSize: 20, fontWeight: "800" }}>Thông tin tài khoản</Text>
          <RegisterForm />
        </View>
        <TouchableOpacity onPress={() => router.replace("/login")} style={{ padding: 20, alignItems: "center" }}><Text style={{ color: Colors.leafgreen, fontWeight: "700" }}>Đã có tài khoản? Đăng nhập</Text></TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
};
