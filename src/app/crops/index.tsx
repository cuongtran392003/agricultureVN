import { AppHeader } from "@/components/common/AppHeader";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { CropBrowser } from "@/components/crops/CropBrowser";
import { CropFormModal } from "@/components/crops/CropFormModal";
import { Colors } from "@/constant/Colors";
import { useTranslation } from "@/i18n";
import { useAuthStore } from "@/stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CropsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, isLoading, loadToken } = useAuthStore();
  const [adding, setAdding] = useState(false);
  useEffect(() => { if (isLoading) void loadToken(); }, [isLoading, loadToken]);
  if (isLoading) return <ActivityIndicator style={{ flex: 1 }} color={Colors.leafgreen} />;
  if (!user) return <Redirect href="/login" />;
  return <SafeAreaView style={{ flex: 1, backgroundColor: Colors.offwhite }}>
    <AppHeader title="Danh mục cây trồng" subtitle="Lưu giống, ghi chú và vùng trồng" onBack={() => router.back()}
      rightAction={<Pressable cssInterop={false} accessibilityRole="button" accessibilityLabel={t("Thêm cây trồng")} onPress={() => setAdding(true)}
        style={({ pressed }) => ({ backgroundColor: pressed ? Colors.deepbark : Colors.forestgreen, width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" })}><Ionicons name="add" size={26} color="white" /></Pressable>} />
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
      <View style={{ backgroundColor: Colors.forestgreen, borderRadius: 24, padding: 20, marginBottom: 22 }}>
        <Text style={{ color: "white", fontSize: 22, fontWeight: "800" }}>Cây trồng của bạn</Text>
        <Text style={{ color: "#D8E8DE", fontSize: 13, lineHeight: 21, marginTop: 8 }}>Mỗi giống và ghi chú có thể lưu thành một cây riêng, kể cả cùng tên.</Text>
        <Pressable cssInterop={false} accessibilityRole="button" onPress={() => setAdding(true)} style={({ pressed }) => ({ backgroundColor: pressed ? Colors.border : Colors.surfaceMuted, padding: 13, borderRadius: 14, marginTop: 16, alignSelf: "flex-start" })}><Text style={{ color: Colors.forestgreen, fontWeight: "700", fontSize: 13 }}>Thêm cây trồng</Text></Pressable>
      </View>
      <CropBrowser onSelect={crop => router.push({ pathname: "/crops/[id]", params: { id: crop._id } })} />
    </ScrollView>
    {adding ? <CropFormModal onClose={() => setAdding(false)} onSaved={() => setAdding(false)} /> : null}
  </SafeAreaView>;
}
