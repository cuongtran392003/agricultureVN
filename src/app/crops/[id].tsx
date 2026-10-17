import { AppHeader } from "@/components/common/AppHeader";
import { FormSection } from "@/components/common/FormSection";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { CropFormModal } from "@/components/crops/CropFormModal";
import { Colors } from "@/constant/Colors";
import { useCrop, useCropMutations } from "@/hooks/api/crops/useCrops";
import { useTranslation } from "@/i18n";
import { useAuthStore } from "@/stores/authStore";
import { cropApiError } from "@/utils/cropValidation";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CropDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const cropId = typeof id === "string" ? id : "";
  const query = useCrop(cropId);
  const { remove } = useCropMutations();
  const router = useRouter();
  const { t, language } = useTranslation();
  const { user, isLoading, loadToken } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const deleting = useRef(false);
  const crop = query.data?.data;
  useEffect(() => { if (isLoading) void loadToken(); }, [isLoading, loadToken]);
  const confirmDelete = () => {
    if (!crop || deleting.current) return;
    Alert.alert(t("Xóa cây trồng?"), `${crop.name}\n\n${t("Chỉ xóa cây trong danh mục. Công việc và mẫu chăm sóc đã tạo vẫn giữ nguyên.")}`, [
      { text: t("Hủy"), style: "cancel" },
      { text: t("Xóa"), style: "destructive", onPress: async () => {
        if (deleting.current) return;
        deleting.current = true;
        try {
          await remove.mutateAsync(crop._id);
          router.replace("/crops");
        } catch (error: unknown) {
          Alert.alert(t("Không thể xóa cây trồng"), cropApiError(error).messages.map(message => t(message)).join("\n"));
        } finally { deleting.current = false; }
      } },
    ]);
  };
  if (isLoading) return <ActivityIndicator style={{ flex: 1 }} color={Colors.leafgreen} />;
  if (!user) return <Redirect href="/login" />;
  const updatedAt = crop?.updatedAt ? new Date(crop.updatedAt) : null;
  return <SafeAreaView style={{ flex: 1, backgroundColor: Colors.offwhite }}>
    <AppHeader title="Chi tiết cây trồng" subtitle="Thông tin trong danh mục của bạn" onBack={() => router.back()} />
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
      {query.isPending && cropId ? <ActivityIndicator color={Colors.leafgreen} style={{ marginTop: 40 }} /> : null}
      {query.isError || !cropId ? <View style={styles.notice}>
        {(cropId ? cropApiError(query.error).messages : ["Cây trồng không tồn tại hoặc không thuộc tài khoản của bạn."]).map((message, index) => <Text key={index} style={styles.body}>{message}</Text>)}
        {cropId ? <PrimaryButton title="Thử tải lại" loading={query.isFetching} onPress={() => { void query.refetch(); }} /> : null}
      </View> : null}
      {crop ? <>
        <View style={styles.hero}><Ionicons name="leaf-outline" size={40} color="#D7EBA9" />
          <Text localize={false} style={styles.name}>{crop.name}</Text>
          {crop.variety ? <Text localize={false} style={styles.variety}>{crop.variety}</Text> : <Text style={styles.variety}>Chưa ghi giống cây</Text>}
          {updatedAt && !Number.isNaN(updatedAt.getTime()) ? <Text localize={false} style={styles.date}>{t("Cập nhật:")} {updatedAt.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US")}</Text> : null}
        </View>
        <FormSection title="Mô tả"><Text localize={!crop.description} selectable style={styles.body}>{crop.description || "Chưa có mô tả."}</Text></FormSection>
        <FormSection title="Vùng trồng"><View style={styles.tags}>{crop.regions?.length ? crop.regions.map(region => <View key={region} style={styles.tag}><Text localize={false} style={styles.region}>{region}</Text></View>) : <Text style={styles.body}>Chưa chọn vùng.</Text>}</View></FormSection>
        <PrimaryButton title="Sửa cây trồng" loading={remove.isPending} onPress={() => setEditing(true)} />
        <Pressable cssInterop={false} disabled={remove.isPending} accessibilityRole="button" onPress={confirmDelete}
          style={({ pressed }) => [styles.delete, pressed && { backgroundColor: "#F7DEDA" }]}>
          {remove.isPending ? <ActivityIndicator color={Colors.error} /> : <Ionicons name="trash-outline" size={20} color={Colors.error} />}
          <Text style={styles.deleteText}>{remove.isPending ? "Đang xóa…" : "Xóa cây trồng"}</Text>
        </Pressable>
        <Text style={styles.caption}>Danh mục này lưu cây và giống. Ngày gieo trồng và giai đoạn thuộc kế hoạch chăm sóc.</Text>
      </> : null}
    </ScrollView>
    {editing && crop ? <CropFormModal key={crop._id} crop={crop} onClose={() => setEditing(false)} onSaved={() => setEditing(false)} /> : null}
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  notice: { padding: 20, borderRadius: 20, backgroundColor: "white", gap: 20 },
  hero: { backgroundColor: Colors.forestgreen, padding: 24, borderRadius: 26, marginBottom: 20 },
  name: { fontSize: 28, lineHeight: 36, fontWeight: "800", color: "white", marginTop: 15 },
  variety: { color: "#D8E8DE", fontSize: 15, lineHeight: 23, marginTop: 10 },
  date: { color: "#C8DDCF", fontSize: 11, marginTop: 20 },
  body: { color: Colors.textSecondary, fontSize: 14, lineHeight: 23 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: { backgroundColor: Colors.surfaceMuted, padding: 12, borderRadius: 12, maxWidth: "100%" },
  region: { color: Colors.forestgreen, fontSize: 13 },
  delete: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#FFF2EF", borderRadius: 16, minHeight: 52, marginTop: 12 },
  deleteText: { color: Colors.error, fontSize: 14, fontWeight: "700" },
  caption: { color: Colors.textSecondary, fontSize: 12, lineHeight: 20, marginTop: 20 },
});
