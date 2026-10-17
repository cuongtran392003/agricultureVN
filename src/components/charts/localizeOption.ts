import { Language, translate } from "@/i18n";
import type { EChartsOption } from "echarts";

export const localizeOption = (option: EChartsOption, language: Language): EChartsOption => {
  const visit = (value: unknown): unknown => {
    if (typeof value === "string") return translate(value, language);
    if (Array.isArray(value)) return value.map(visit);
    if (value && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
      return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, visit(item)]));
    }
    return value;
  };
  return visit(option) as EChartsOption;
};
