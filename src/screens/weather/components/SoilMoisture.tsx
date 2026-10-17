import { AppChart } from "@/components/charts/AppChart";
import { Colors } from "@/constant/Colors";
import type { EChartsOption } from "echarts";
import { View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";

const option: EChartsOption = {
  grid: { left: 72, right: 38, top: 12, bottom: 22 },
  xAxis: { type: "value", min: 0, max: 100, axisLabel: { fontSize: 10, color: Colors.textSecondary, formatter: "{value}%" }, splitLine: { lineStyle: { color: Colors.surfaceMuted } } },
  yAxis: { type: "category", inverse: true, data: ["Vườn A", "Vườn B", "Vườn C"], axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: Colors.textPrimary, fontSize: 11 } },
  series: [{ type: "bar", data: [77, 55, 68], barWidth: 15, showBackground: true, backgroundStyle: { color: Colors.surfaceMuted, borderRadius: 8 }, itemStyle: { color: Colors.leafgreen, borderRadius: 8 }, label: { show: true, position: "right", formatter: "{c}%", color: Colors.textPrimary, fontSize: 11 } }],
};
export const SoilMoisture = () => (
  <View style={{ marginHorizontal: 20, marginTop: 20, padding: 18, backgroundColor: Colors.surface, borderRadius: 24, borderWidth: 1, borderColor: Colors.border }}>
    <Text style={{ fontSize: 18, fontWeight: "800", color: Colors.textPrimary }}>Độ ẩm đất theo khu vực</Text>
    <Text style={{ fontSize: 11, lineHeight: 18, color: Colors.textSecondary, marginTop: 6 }}>Dữ liệu minh họa · Chưa kết nối cảm biến đất</Text>
    <AppChart height={155} option={option} accessibilityLabel="Biểu đồ minh họa độ ẩm đất: Vườn A 77%, Vườn B 55%, Vườn C 68%" />
  </View>
);
