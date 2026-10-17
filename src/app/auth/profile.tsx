import { AppHeader } from "@/components/common/AppHeader";
import { FormSection } from "@/components/common/FormSection";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Colors } from "@/constant/Colors";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { SafeAreaView } from "react-native-safe-area-context";
import UpdateProfile from "./updateprofile";
export default function ProfileScreen() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  return <SafeAreaView style={{ flex: 1, backgroundColor: Colors.offwhite }}>
    <AppHeader title="Hồ sơ cá nhân" subtitle="Thông tin tài khoản của bạn" onBack={() => router.back()} />
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16, backgroundColor: Colors.forestgreen, borderRadius: 26, padding: 24, marginBottom: 20 }}>
        <View style={{ width: 68, height: 68, backgroundColor: "#386650", borderRadius: 22, alignItems: "center", justifyContent: "center" }}><Text style={{ color: "white", fontSize: 30, fontWeight: "800" }}>{user?.name?.charAt(0).toUpperCase() || "U"}</Text></View>
        <View style={{ flex: 1 }}><Text localize={!user?.name} style={{ color: "white", fontSize: 22, fontWeight: "800" }}>{user?.name || "Tài khoản của bạn"}</Text><Text style={{ color: "#C8DDCF", marginTop: 6 }}>{user?.role || "Thành viên"}</Text></View>
      </View>
      <FormSection title="Thông tin liên hệ" description="Thông tin được sử dụng cho tài khoản của bạn.">
        {[{ label: "Họ và tên", value: user?.name }, { label: "Email", value: user?.email }, { label: "Mã tài khoản", value: user?._id }].map(item => <View key={item.label} style={{ paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.border }}><Text style={{ color: Colors.textSecondary, fontSize: 12 }}>{item.label}</Text><Text localize={!item.value} selectable style={{ color: Colors.textPrimary, fontSize: 16, fontWeight: "700", marginTop: 7 }}>{item.value || "Chưa cập nhật"}</Text></View>)}
      </FormSection>
      <PrimaryButton title="Chỉnh sửa thông tin" onPress={() => setVisible(true)} />
    </ScrollView>
    <UpdateProfile visible={visible} onClose={() => setVisible(false)} />
  </SafeAreaView>;
}
