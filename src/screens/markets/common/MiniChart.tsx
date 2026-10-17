import { AppChart } from "@/components/charts/AppChart";
import { Colors } from "@/constant/Colors";
import type { EChartsOption } from "echarts";
import { useMemo } from "react";
import { View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";

export const MiniChart = ({ data, color = Colors.leafgreen }: { data: number[]; color?: string }) => {
  const values = useMemo(() => data.filter(Number.isFinite), [data]);
  const option = useMemo<EChartsOption>(() => ({
    animationDuration: 400,
    grid: { left: 2, right: 2, top: 6, bottom: 3 },
    xAxis: { type: "category", show: false, boundaryGap: false, data: values.map((_, i) => i + 1) },
    yAxis: { type: "value", show: false, scale: true },
    series: [{ type: "line", data: values, smooth: true, symbol: values.length === 1 ? "circle" : "none", symbolSize: 5, itemStyle: { color }, lineStyle: { width: 2, color }, areaStyle: { color, opacity: 0.12 } }],
  }), [values, color]);
  return <View style={{ marginTop: 6 }}>
    {values.length ? <AppChart height={48} option={option} accessibilityLabel={`Xu hướng giá qua ${values.length} mốc dữ liệu`} /> : <Text style={{ color: Colors.textSecondary, fontSize: 11 }}>Chưa có lịch sử giá</Text>}
  </View>;
};
