

import React from "react";
import { View } from "react-native";

interface MiniChartProps {
  data: number[];
  color?: string;
}

export const MiniChart = ({ data, color = "bg-emerald-600" }: MiniChartProps) => {
  // Tránh chia cho 0 nếu mảng rỗng hoặc toàn số 0
  const maxValue = Math.max(...data, 1); 

  return (
    <View className="flex-row items-end gap-1 h-12 px-1 mt-2">
      {data.map((value, index) => {
        const heightPercentage = (value / maxValue) * 100;

        return (
          <View
            key={index}
            style={{ height: `${heightPercentage}%` }}
            className={`w-[12%] rounded-t-sm ${color} opacity-80`}
          />
        );
      })}
    </View>
  );
};