import { BarChart, LineChart, PieChart } from "echarts/charts";
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from "echarts/components";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { useEffect, useMemo, useRef } from "react";
import { useLanguageStore } from "@/i18n";
import { localizeOption } from "./localizeOption";
import { AppChartProps } from "./types";

echarts.use([SVGRenderer, BarChart, LineChart, PieChart, GridComponent, LegendComponent, TitleComponent, TooltipComponent]);

export const AppChart = ({ option, height, accessibilityLabel }: AppChartProps) => {
  const language = useLanguageStore(state => state.language);
  const localized = useMemo(() => localizeOption(option, language), [option, language]);
  const surface = useRef<HTMLDivElement>(null);
  const instance = useRef<ReturnType<typeof echarts.init> | null>(null);

  useEffect(() => {
    if (!surface.current) return;
    const chart = echarts.init(surface.current, undefined, { renderer: "svg" });
    instance.current = chart;
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(surface.current);
    return () => {
      observer.disconnect();
      chart.dispose();
      instance.current = null;
    };
  }, []);

  useEffect(() => {
    instance.current?.setOption(localized, { notMerge: true });
    instance.current?.resize();
  }, [localized, height]);

  return <div ref={surface} role="img" aria-label={accessibilityLabel} style={{ width: "100%", height, overflow: "hidden" }} />;
};
