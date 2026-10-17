import { Colors } from "@/constant/Colors";
import { useAuthStore } from "@/stores/authStore";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralSettings } from "./components/GeneralSettings";
import { LogoutButton } from "./components/LogoutButton";
import { NotificationSettings } from "./components/NotificationSettings";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileInfo } from "./components/ProfileInfo";
import { SettingHeader } from "./components/SettingHeader";

export const SettingScreen = () => {
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/login" as any);
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      <SettingHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <Animated.View entering={FadeInDown.duration(420)} className="mx-5 mt-5 rounded-[28px] pt-3 pb-5" style={{ backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border }}>
          <ProfileHeader id={user?._id} name={user?.name} />
          <View className="mx-5 rounded-[16px] px-4 py-3 flex-row justify-between" style={{ backgroundColor: Colors.surfaceMuted }}>
            <View>
              <Text className="text-[12px] font-semibold" style={{ color: Colors.textSecondary }}>TRẠNG THÁI TÀI KHOẢN</Text>
              <Text className="font-bold mt-1" style={{ color: Colors.forestgreen }}>Đang hoạt động</Text>
            </View>
            <View className="w-3 h-3 rounded-full mt-2" style={{ backgroundColor: Colors.success }} />
          </View>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(90).duration(420)}>
          <ProfileInfo name={user?.name} onPress={() => router.push("/auth/profile" as any)} />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(150).duration(420)}>
          <NotificationSettings />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(210).duration(420)}>
          <GeneralSettings />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(270).duration(420)}>
          <LogoutButton onLogout={() => void handleLogout()} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};
