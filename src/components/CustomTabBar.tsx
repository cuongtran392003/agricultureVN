import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "@/i18n";
import * as Haptics from "expo-haptics";
import { router, usePathname } from "expo-router";
import { ComponentProps, useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IoniconsName = ComponentProps<typeof Ionicons>["name"];

const TABS: { name: string; path: string; icon: IoniconsName; iconOutline: IoniconsName }[] = [
  { name: "Trang chủ", path: "/(tabs)/home", icon: "home", iconOutline: "home-outline" },
  { name: "Lịch trình", path: "/(tabs)/schedule", icon: "calendar", iconOutline: "calendar-outline" },
  { name: "Chẩn đoán", path: "/(tabs)/diagnosis", icon: "camera", iconOutline: "camera-outline" },
  { name: "Thị trường", path: "/(tabs)/market", icon: "stats-chart", iconOutline: "stats-chart-outline" },
  { name: "Cài đặt", path: "/(tabs)/setting", icon: "settings", iconOutline: "settings-outline" },
];

const TabItem = ({ tab, isActive }: { tab: (typeof TABS)[number]; isActive: boolean }) => {
  const { t } = useTranslation();
  const scale = useRef(new Animated.Value(isActive ? 1 : 0.92)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: isActive ? 1 : 0.92,
      useNativeDriver: true,
      friction: 7,
      tension: 120,
    }).start();
  }, [isActive, scale]);

  return (
    <Pressable
      cssInterop={false}
      onPress={() => {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.navigate(tab.path as any);
      }}
      accessibilityRole="tab"
      accessibilityLabel={t(tab.name)}
      accessibilityState={{ selected: isActive }}
      style={({ pressed }) => [styles.tab, pressed && { backgroundColor: "#EEF6EF" }]}
    >
      <Animated.View
        style={[
          styles.iconWrapper,
          isActive && styles.iconWrapperActive,
          { transform: [{ scale }] },
        ]}
      >
        <Ionicons name={isActive ? tab.icon : tab.iconOutline} size={21} color={isActive ? "#FFFFFF" : "#789082"} />
      </Animated.View>
      <Text numberOfLines={1} maxFontSizeMultiplier={1.2} style={[styles.label, isActive && styles.labelActive]}>{tab.name}</Text>
    </Pressable>
  );
};

export default function CustomTabBar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12), paddingLeft: Math.max(insets.left, 4), paddingRight: Math.max(insets.right, 4) }]}>
      {TABS.map((tab) => {
        const isActive = pathname === tab.path || pathname.includes(tab.path.replace("/(tabs)", ""));
        return <TabItem key={tab.path} tab={tab} isActive={isActive} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexShrink: 0,
    backgroundColor: "rgba(255, 255, 255, 0.97)",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E1ECE3",
    shadowColor: "#193B2B",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 14,
  },
  tab: { flex: 1, minWidth: 0, minHeight: 60, alignItems: "center", justifyContent: "center", gap: 3, borderRadius: 14, paddingHorizontal: 2 },
  iconWrapper: { width: 42, height: 42, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  iconWrapperActive: {
    backgroundColor: "#2F7D5D",
    shadowColor: "#1E6247",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 7,
    elevation: 5,
  },
  label: { fontSize: 10, lineHeight: 14, textAlign: "center", color: "#789082", fontWeight: "600" },
  labelActive: { color: "#236548", fontWeight: "800" },
});
