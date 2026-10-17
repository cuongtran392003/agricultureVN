import { FormField } from "@/components/common/FormField";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { Colors } from "@/constant/Colors";
import { useCrops } from "@/hooks/api/crops/useCrops";
import { useTranslation } from "@/i18n";
import { Crop, CropParams } from "@/types/crops";
import { cropApiError } from "@/utils/cropValidation";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

export const CropBrowser = ({ onSelect }: { onSelect: (crop: Crop) => void }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [params, setParams] = useState<CropParams>({ page: 1, limit: 10 });
  const query = useCrops(params);
  const totalPages = Math.max(query.data?.meta.totalPages ?? 1, 1);
  useEffect(() => {
    const timer = setTimeout(() => setParams(current => {
      const value = search.trim() || undefined;
      return current.search === value ? current : { ...current, page: 1, search: value };
    }), 300);
    return () => clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    if (query.data && !query.isFetching && params.page > totalPages) setParams(current => ({ ...current, page: totalPages }));
  }, [query.data, query.isFetching, params.page, totalPages]);
  const selectRegion = (value: string) => {
    setRegion(value);
    setParams(current => ({ ...current, page: 1, region: value.trim() || undefined }));
  };
  return <View>
    <FormField label="Tìm cây trồng" icon="search-outline" placeholder="Nhập tên cây hoặc giống…" value={search} onChangeText={setSearch} autoCorrect={false} />
    <View style={styles.toolbar}>
      <Text style={styles.count}>Kết quả: {query.data?.meta.total ?? "—"}</Text>
      <View style={styles.actions}>
        <Pressable cssInterop={false} accessibilityRole="button" accessibilityLabel={t("Lọc theo vùng")} onPress={() => setFiltersOpen(value => !value)}
          style={({ pressed }) => [styles.smallButton, (params.region || pressed) && { backgroundColor: Colors.border }]}>
          <Ionicons name="options-outline" size={18} color={Colors.forestgreen} /><Text style={styles.smallText}>Lọc vùng</Text>
        </Pressable>
        <Pressable cssInterop={false} accessibilityRole="button" accessibilityLabel={t("Tải lại danh mục")} disabled={query.isFetching}
          onPress={() => { void query.refetch(); }} style={({ pressed }) => [styles.smallButton, pressed && { backgroundColor: Colors.border }]}>
          <Ionicons name="refresh-outline" size={19} color={Colors.forestgreen} />
        </Pressable>
      </View>
    </View>
    {filtersOpen ? <View style={styles.filters}>
      <FormField label="Vùng cần tìm" placeholder="Nhập chính xác tên vùng" value={region} onChangeText={setRegion} />
      <View style={styles.tags}>{["Miền Bắc", "Miền Trung", "Miền Nam"].map(value => <Pressable cssInterop={false} key={value} onPress={() => selectRegion(value)}
        accessibilityRole="button" style={({ pressed }) => [styles.tag, (params.region === value || pressed) && { backgroundColor: Colors.border }]}><Text style={styles.smallText}>{value}</Text></Pressable>)}</View>
      <Pressable cssInterop={false} accessibilityRole="button" onPress={() => selectRegion(region)} style={({ pressed }) => [styles.apply, pressed && { backgroundColor: Colors.deepbark }]}><Text style={styles.applyText}>Áp dụng vùng</Text></Pressable>
    </View> : null}
    {params.region ? <View style={styles.activeFilter}><Text localize={false} style={styles.regionValue}>{params.region}</Text>
      <Pressable cssInterop={false} accessibilityRole="button" accessibilityLabel={t("Bỏ lọc vùng")} onPress={() => selectRegion("")} style={styles.close}><Ionicons name="close-circle" size={22} color={Colors.leafgreen} /></Pressable>
    </View> : null}
    {query.isError ? <View style={styles.notice} accessibilityLiveRegion="polite">
      {cropApiError(query.error).messages.map((message, index) => <Text key={index} style={styles.error}>{message}</Text>)}
      <Pressable cssInterop={false} accessibilityRole="button" onPress={() => { void query.refetch(); }} style={styles.close}><Text style={styles.smallText}>Thử tải lại</Text></Pressable>
    </View> : null}
    {query.isFetching ? <ActivityIndicator color={Colors.leafgreen} style={{ marginVertical: 16 }} /> : null}
    {!query.isPending && !query.isError && !query.data?.data.length ? <View style={styles.empty}>
      <Ionicons name="leaf-outline" size={38} color={Colors.leafgreen} />
      <Text style={styles.emptyTitle}>{params.search || params.region ? "Không tìm thấy cây phù hợp" : "Danh mục chưa có cây trồng"}</Text>
      <Text style={styles.caption}>{params.search || params.region ? "Thử tên hoặc vùng khác." : "Thêm cây để lưu giống, ghi chú và vùng trồng."}</Text>
    </View> : null}
    {query.data?.data.map(crop => <Pressable cssInterop={false} key={crop._id} onPress={() => onSelect(crop)} accessibilityRole="button"
      accessibilityLabel={[crop.name, crop.variety].filter(Boolean).join(" · ")}
      style={({ pressed }) => [styles.card, pressed && { backgroundColor: Colors.surfaceMuted }]}>
      <View style={styles.cardTop}>
        <View style={styles.icon}><Ionicons name="leaf-outline" size={25} color={Colors.forestgreen} /></View>
        <View style={{ flex: 1, minWidth: 0 }}><Text localize={false} style={styles.name}>{crop.name}</Text>
          {crop.variety ? <Text localize={false} style={styles.caption}>{crop.variety}</Text> : <Text style={styles.caption}>Chưa ghi giống cây</Text>}
        </View><Ionicons name="chevron-forward" size={19} color={Colors.textSecondary} />
      </View>
      {crop.description ? <Text localize={false} numberOfLines={2} style={styles.description}>{crop.description}</Text> : null}
      {crop.regions?.length ? <View style={styles.tags}>{crop.regions.slice(0, 3).map(value => <View key={value} style={styles.tag}><Text localize={false} numberOfLines={1} style={styles.tagText}>{value}</Text></View>)}
        {crop.regions.length > 3 ? <Text localize={false} style={styles.caption}>+{crop.regions.length - 3}</Text> : null}
      </View> : null}
    </Pressable>)}
    <View style={styles.pagination}>
      <Pressable cssInterop={false} accessibilityRole="button" disabled={params.page <= 1 || query.isFetching} accessibilityState={{ disabled: params.page <= 1 || query.isFetching }}
        onPress={() => setParams(current => ({ ...current, page: Math.max(1, current.page - 1) }))} style={styles.pageButton}><Ionicons name="chevron-back" size={20} color={params.page > 1 ? Colors.forestgreen : Colors.textSecondary} /><Text style={styles.smallText}>Trước</Text></Pressable>
      <Text style={styles.caption}>Trang {params.page}/{totalPages}</Text>
      <Pressable cssInterop={false} accessibilityRole="button" disabled={!query.data?.meta.hasNextPage || query.isFetching} accessibilityState={{ disabled: !query.data?.meta.hasNextPage || query.isFetching }}
        onPress={() => setParams(current => ({ ...current, page: current.page + 1 }))} style={styles.pageButton}><Text style={styles.smallText}>Sau</Text><Ionicons name="chevron-forward" size={20} color={query.data?.meta.hasNextPage ? Colors.forestgreen : Colors.textSecondary} /></Pressable>
    </View>
  </View>;
};
const styles = StyleSheet.create({
  toolbar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 16 },
  count: { color: Colors.textPrimary, fontWeight: "700", fontSize: 13, flexShrink: 1 },
  actions: { flexDirection: "row", gap: 8 },
  smallButton: { flexDirection: "row", gap: 6, alignItems: "center", justifyContent: "center", padding: 12, minHeight: 44, borderRadius: 12, backgroundColor: Colors.surfaceMuted },
  smallText: { color: Colors.forestgreen, fontSize: 12, fontWeight: "700" },
  filters: { padding: 16, borderRadius: 20, backgroundColor: "white", borderWidth: 1, borderColor: Colors.border, marginBottom: 16 },
  tags: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 6, marginTop: 10 },
  tag: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10, backgroundColor: Colors.surfaceMuted, maxWidth: "100%" },
  tagText: { color: Colors.forestgreen, fontSize: 11 },
  apply: { backgroundColor: Colors.forestgreen, padding: 13, borderRadius: 12, alignItems: "center", marginTop: 14 },
  applyText: { color: "white", fontWeight: "700", fontSize: 13 },
  activeFilter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12, borderRadius: 12, backgroundColor: Colors.surfaceMuted, marginBottom: 16 },
  regionValue: { color: Colors.forestgreen, fontSize: 13, flex: 1 },
  close: { padding: 12 },
  notice: { padding: 14, borderRadius: 14, backgroundColor: "#FFF2EF", marginBottom: 14 },
  error: { color: Colors.error, fontSize: 13, lineHeight: 21 },
  empty: { alignItems: "center", padding: 25, gap: 12 },
  emptyTitle: { color: Colors.textPrimary, fontSize: 16, fontWeight: "700", textAlign: "center" },
  caption: { color: Colors.textSecondary, fontSize: 12, lineHeight: 19 },
  card: { padding: 18, borderRadius: 22, borderWidth: 1, borderColor: Colors.border, backgroundColor: "white", marginBottom: 12 },
  cardTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  icon: { width: 46, height: 46, borderRadius: 16, backgroundColor: Colors.surfaceMuted, alignItems: "center", justifyContent: "center" },
  name: { color: Colors.textPrimary, fontWeight: "800", fontSize: 18, lineHeight: 24 },
  description: { color: Colors.textSecondary, fontSize: 13, lineHeight: 20, marginTop: 12 },
  pagination: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8, marginVertical: 18 },
  pageButton: { flexDirection: "row", alignItems: "center", gap: 2, minHeight: 44, paddingHorizontal: 8, borderRadius: 12, backgroundColor: Colors.surfaceMuted },
});
