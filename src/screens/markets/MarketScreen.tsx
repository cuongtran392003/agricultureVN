import { Colors } from "@/constant/Colors";
import { useTranslation } from "@/i18n";
import { getPriceService } from "@/services/service.price";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { AgriNewsCard } from "./components/AgriNewsCard";
import { MarketHeader } from "./components/MarketHeader";
import { MarketPriceCard } from "./components/MarketPriceCard";

interface PriceItem { id: string; name: string; price: string; change: string; history: number[] }

export const MarketScreen = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<PriceItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"prices" | "news">("prices");

  const getPrices = async () => {
    setRefreshing(true);
    setError(false);
    try {
      const response = await getPriceService();
      setData(response);
      setUpdatedAt(new Date());
    } catch { setError(true); } finally { setRefreshing(false); }
  };
  useEffect(() => { void getPrices(); }, []);
  const filtered = data.filter((item) => item.name.toLocaleLowerCase("vi").includes(search.trim().toLocaleLowerCase("vi")));

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <MarketHeader />
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.content} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void getPrices()} tintColor={Colors.forestgreen} />}>
        <View style={styles.hero}>
          <Ionicons name="stats-chart-outline" size={32} color={Colors.sunlightyellow} />
          <View style={{ flex: 1 }}><Text style={styles.heroTitle}>Nhịp thị trường</Text><Text style={styles.heroCaption}>{updatedAt ? `Cập nhật ${updatedAt.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })} · ${data.length} nông sản` : "Theo dõi giá và tin tức nông nghiệp"}</Text></View>
        </View>
        <View style={styles.tabs}>{(["prices", "news"] as const).map(value => {
          const selected = tab === value;
          return (
            <Pressable
              cssInterop={false}
              key={value}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              onPress={() => setTab(value)}
              style={({ pressed }) => [
                styles.tab,
                selected && styles.tabActive,
                pressed && { backgroundColor: selected ? Colors.deepbark : Colors.border },
              ]}
            >
              <Text numberOfLines={1} style={{ color: selected ? "white" : Colors.textPrimary, fontWeight: "700" }}>
                {value === "prices" ? "Bảng giá" : "Tin tức"}
              </Text>
            </Pressable>
          );
        })}</View>
        {tab === "prices" ? <>
          <View style={styles.search}><Ionicons name="search-outline" size={21} color={Colors.textSecondary} /><TextInput style={styles.input} placeholder={t("Tìm tên nông sản…")} placeholderTextColor={Colors.textSecondary} value={search} onChangeText={setSearch} accessibilityLabel={t("Tìm nông sản")} />{search ? <TouchableOpacity accessibilityLabel={t("Xóa tìm kiếm")} onPress={() => setSearch("")}><Ionicons name="close-circle" size={20} color={Colors.textSecondary} /></TouchableOpacity> : null}</View>
          <Text style={styles.title}>Giá nông sản <Text style={styles.count}>({filtered.length})</Text></Text>
          {error && <TouchableOpacity onPress={() => void getPrices()} style={styles.notice}><Text style={{ color: Colors.error }}>Không tải được giá mới. Chạm để thử lại.</Text></TouchableOpacity>}
          {refreshing && !data.length ? <ActivityIndicator style={{ marginTop: 30 }} color={Colors.leafgreen} /> : filtered.length ? <View style={styles.grid}>{filtered.map((item) => <View key={item.id} style={styles.gridItem}><MarketPriceCard name={item.name} price={item.price} change={item.change} history={item.history || []} /></View>)}</View> : <View style={styles.notice}><Text style={{ color: Colors.textSecondary }}>{search ? "Không tìm thấy nông sản phù hợp." : "Chưa có dữ liệu bảng giá."}</Text></View>}
        </> : <AgriNewsCard />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 32 },
  hero: { flexDirection: "row", alignItems: "center", gap: 16, backgroundColor: Colors.forestgreen, borderRadius: 24, padding: 22 },
  heroTitle: { fontSize: 24, color: "white", fontWeight: "800" }, heroCaption: { color: "#C8DDCF", fontSize: 12, marginTop: 8 },
  tabs: { flexDirection: "row", backgroundColor: Colors.surfaceMuted, padding: 5, borderRadius: 18, marginVertical: 20 }, tab: { flex: 1, minWidth: 0, minHeight: 44, alignItems: "center", justifyContent: "center", paddingVertical: 13, borderRadius: 14 }, tabActive: { backgroundColor: Colors.forestgreen },
  search: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: 16, paddingHorizontal: 14 }, input: { flex: 1, paddingVertical: 14, color: Colors.textPrimary, fontSize: 14 },
  title: { fontSize: 21, fontWeight: "800", color: Colors.textPrimary, marginTop: 24 }, count: { color: Colors.textSecondary, fontSize: 15 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }, gridItem: { width: "48%" }, notice: { padding: 20, backgroundColor: Colors.surface, borderRadius: 18, marginTop: 16 },
});
