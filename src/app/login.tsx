import { AppHeader } from "@/components/common/AppHeader";
import { Colors } from "@/constant/Colors";
import { FormLogin } from "@/screens/login/FormLogin";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  return <SafeAreaView style={{ flex: 1, backgroundColor: Colors.offwhite }}>
    <AppHeader title="Nông nghiệp Việt" subtitle="Đồng hành cùng nhà nông" />
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 20, paddingBottom: 36 }}>
        <View style={{ backgroundColor: Colors.forestgreen, padding: 24, borderRadius: 26, marginBottom: 20 }}>
          <Ionicons name="sunny-outline" size={32} color={Colors.sunlightyellow} />
          <Text style={{ color: "white", fontSize: 28, fontWeight: "800", marginTop: 14 }}>Một mùa vụ tốt bắt đầu từ hôm nay.</Text>
          <Text style={{ color: "#C8DDCF", fontSize: 14, lineHeight: 22, marginTop: 10 }}>Theo dõi công việc, thời tiết và nông sản ở cùng một nơi.</Text>
        </View>
        <View style={{ backgroundColor: Colors.surface, borderRadius: 26, padding: 22 }}>
          <Text style={{ color: Colors.textPrimary, fontSize: 23, fontWeight: "800" }}>Chào mừng trở lại</Text>
          <Text style={{ color: Colors.textSecondary, lineHeight: 21, marginTop: 7 }}>Đăng nhập để tiếp tục chăm sóc vườn.</Text>
          <FormLogin />
        </View>
        <TouchableOpacity onPress={() => router.navigate("/register")} style={{ padding: 20, alignItems: "center" }}><Text style={{ color: Colors.leafgreen, fontWeight: "700" }}>Chưa có tài khoản? Đăng ký ngay</Text></TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}
