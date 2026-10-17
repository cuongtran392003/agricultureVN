import { AppChart } from "@/components/charts/AppChart";
import { Colors } from "@/constant/Colors";
import type { RainForecast } from "@/hooks/useWeatherForecast";
import type { EChartsOption } from "echarts";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";

export const RainfallChart = ({ data = [] }: { data?: RainForecast[] }) => {
  const option = useMemo<EChartsOption>(() => ({
    animationDuration: 450,
    grid: { left: 38, right: 12, top: 18, bottom: 28 },
    xAxis: { type: "category", data: data.map(item => item.label), axisTick: { show: false }, axisLine: { show: false }, axisLabel: { color: Colors.textSecondary, fontSize: 10 } },
    yAxis: { type: "value", min: 0, axisLabel: { color: Colors.textSecondary, fontSize: 10 }, splitLine: { lineStyle: { color: Colors.surfaceMuted } } },
    series: [{ type: "bar", data: data.map(item => item.mm), barMaxWidth: 28, itemStyle: { color: Colors.leafgreen, borderRadius: [6, 6, 0, 0] }, label: { show: true, position: "top", color: Colors.textPrimary, fontSize: 10 } }],
  }), [data]);
  const maximum = data.length ? Math.max(...data.map(item => item.mm)) : 0;
  return (
    <View style={styles.card}>
      <View style={styles.heading}><Text style={styles.title}>Dự báo lượng mưa</Text><Text style={styles.unit}>mm</Text></View>
      <Text style={styles.hint}>Tổng lượng mưa trong các khoảng dự báo của từng ngày.</Text>
      {data.length ? <AppChart option={option} height={190} accessibilityLabel={`Dự báo lượng mưa ${data.length} ngày, cao nhất ${maximum} mm`} /> : <Text style={styles.empty}>Chưa có dữ liệu dự báo lượng mưa.</Text>}
      {data.length > 0 && <Text style={styles.hint}>Ngày đầu và cuối có thể chỉ có dữ liệu cho một phần ngày.</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  card: { marginHorizontal: 20, marginTop: 20, backgroundColor: Colors.surface, padding: 18, borderRadius: 24, borderWidth: 1, borderColor: Colors.border },
  heading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  title: { fontSize: 18, fontWeight: "800", color: Colors.textPrimary },
  unit: { fontSize: 12, fontWeight: "700", color: Colors.leafgreen },
  hint: { fontSize: 11, lineHeight: 17, color: Colors.textSecondary, marginTop: 7 },
  empty: { paddingVertical: 28, color: Colors.textSecondary, textAlign: "center", fontSize: 13 },
});
