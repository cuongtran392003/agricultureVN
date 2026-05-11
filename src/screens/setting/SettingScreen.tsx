import { useAuthStore } from "@/stores/authStore";
import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralSettings } from "./components/GeneralSettings";
import { LogoutButton } from "./components/LogoutButton";
import { NotificationSettings } from "./components/NotificationSettings";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileInfo } from "./components/ProfileInfo";
import { SettingHeader } from "./components/SettingHeader";

export const SettingScreen = () => {
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace("/login" as any);
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "transparent" }}
    >
      <SettingHeader />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <ProfileHeader id={user?._id} name={user?.name} />
        <ProfileInfo
          name={user?.name}
          onPress={() => {
            router.push("/auth/profile" as any);
          }}
        />
        <NotificationSettings />
        <GeneralSettings />
        <LogoutButton onLogout={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
};
