import SvgChart, { SVGRenderer } from "@wuba/react-native-echarts/svgChart";
import { BarChart, LineChart, PieChart } from "echarts/charts";
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from "echarts/components";
import * as echarts from "echarts/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguageStore } from "@/i18n";
import { localizeOption } from "./localizeOption";
import { View } from "react-native";
import { AppChartProps } from "./types";

echarts.use([SVGRenderer, BarChart, LineChart, PieChart, GridComponent, LegendComponent, TitleComponent, TooltipComponent]);

export const AppChart = ({ option, height, accessibilityLabel }: AppChartProps) => {
  const language = useLanguageStore(state => state.language);
  const localized = useMemo(() => localizeOption(option, language), [option, language]);
  const surface = useRef<any>(null);
  const instance = useRef<ReturnType<typeof echarts.init> | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!width || !surface.current) return;
    const chart = echarts.init(surface.current, undefined, { renderer: "svg", width, height });
    instance.current = chart;
    return () => {
      chart.dispose();
      instance.current = null;
    };
  }, [width, height]);

  useEffect(() => {
    instance.current?.setOption(localized, { notMerge: true });
  }, [localized, width, height]);

  return (
    <View
      style={{ width: "100%", height, overflow: "hidden" }}
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      onLayout={event => setWidth(Math.round(event.nativeEvent.layout.width))}
    >
      {width > 0 && <SvgChart ref={surface} handleGesture={false} />}
    </View>
  );
};
