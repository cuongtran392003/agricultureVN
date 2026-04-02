import { Card } from "@/components/ui/card";
import { Colors } from "@/constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface MonthData {
  month: string;
  value: number;
}

const rainfallData: MonthData[] = [
  { month: "T1", value: 70 },
  { month: "T2", value: 45 },
  { month: "T3", value: 80 },
  { month: "T4", value: 110 },
  { month: "T5", value: 170 },
  { month: "T6", value: 520 },
  { month: "T7", value: 400 },
  { month: "T8", value: 380 },
  { month: "T9", value: 290 },
  { month: "T10", value: 150 },
  { month: "T11", value: 90 },
  { month: "T12", value: 70 },
];

const maxValue = Math.max(...rainfallData.map((d) => d.value));

export const RainfallChart = () => {
  return (
    <View className="mt-5 px-[20px] mb-6">
      {/* Section header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text
          className="font-bold text-[16px]"
          style={{ color: Colors.brownearth }}
        >
          Biểu đồ lượng mưa hàng tháng
        </Text>
        <View className="flex-row items-center gap-1">
          <Ionicons name="rainy-outline" size={14} color={Colors.brandorange} />
          <Text className="text-[11px] font-medium" style={{ color: Colors.brandorange }}>
            mm/tháng
          </Text>
        </View>
      </View>

      <Card className="rounded-[14px] p-[14px]">
        {/* Bar chart */}
        <View className="flex-row items-end justify-between" style={{ height: 120 }}>
          {rainfallData.map((item, index) => {
            const barHeight = Math.max((item.value / maxValue) * 100, 6);
            const isMax = item.value === maxValue;
            return (
              <View key={index} className="items-center flex-1 mx-[1px]">
                <Text
                  className="text-[7px] mb-1 font-semibold"
                  style={{
                    color: isMax ? Colors.brandorange : Colors.softsoil,
                  }}
                >
                  {item.value}
                </Text>
                <View
                  className="w-[12px] rounded-t-[3px]"
                  style={{
                    height: barHeight,
                    backgroundColor: isMax
                      ? Colors.brandorange
                      : Colors.forestgreen + "70",
                  }}
                />
              </View>
            );
          })}
        </View>

        {/* Month labels */}
        <View className="flex-row justify-between mt-2">
          {rainfallData.map((item, index) => (
            <View key={index} className="items-center flex-1">
              <Text className="text-[8px]" style={{ color: Colors.softsoil }}>
                {item.month}
              </Text>
            </View>
          ))}
        </View>

        {/* Legend */}
        <View
          className="flex-row items-center justify-between mt-3 pt-3"
          style={{ borderTopWidth: 1, borderTopColor: "#EDE6DE" }}
        >
          <View>
            <Text className="text-[9px] font-semibold" style={{ color: Colors.softsoil }}>
              CAO NHẤT
            </Text>
            <Text className="text-[11px] font-bold" style={{ color: Colors.brandorange }}>
              520 mm (Th 6)
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-[9px] font-semibold" style={{ color: Colors.softsoil }}>
              TRUNG BÌNH
            </Text>
            <Text className="text-[11px] font-bold" style={{ color: Colors.forestgreen }}>
              245 mm
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};
