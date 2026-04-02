
import CustomTabBar from "@/components/CustomTabBar";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: "transparent" },
      }}
      tabBar={() => <CustomTabBar/>}
    >
      <StatusBar style="dark" backgroundColor="transparent" translucent={true}/>
      <Tabs.Screen
        name="home"
        options={{ title: "Home", tabBarIcon: () => <Ionicons name="home" /> }}
      />
      <Tabs.Screen name="schedule" options={{ title: "Schedule" }} />
      <Tabs.Screen name="diagnosis" options={{ title: "Diagnosis" }} />
      <Tabs.Screen name="market" options={{ title: "Market" }} />
      <Tabs.Screen name="setting" options={{ title: "Setting" }} />
    </Tabs>
  );
}
