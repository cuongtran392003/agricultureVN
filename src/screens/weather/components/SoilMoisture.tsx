import { Card } from "@/components/ui/card";
import { Colors } from "@/constant/Colors";
import { Text, View } from "react-native";

interface AreaData {
  name: string;
  moisture: number;
}

const areas: AreaData[] = [
  { name: "Khu vườn A (Cà phê)", moisture: 77 },
  { name: "Khu vườn B (Hồ tiêu)", moisture: 55 },
  { name: "Khu vườn C (Sầu riêng)", moisture: 68 },
];

const getBarColor = (value: number) => {
  if (value >= 60 && value <= 80) return Colors.forestgreen;
  if (value < 60) return Colors.brandorange;
  return Colors.error;
};

export const SoilMoisture = () => {
  return (
    <View className="mt-5 px-[20px]">
      {/* Section header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text
          className="font-bold text-[16px]"
          style={{ color: Colors.brownearth }}
        >
          Độ ẩm đất theo khu vực
        </Text>
        <View
          className="px-[8px] py-[3px] rounded-full"
          style={{ backgroundColor: "#E8F5E9" }}
        >
          <Text className="text-[10px] font-semibold" style={{ color: Colors.forestgreen }}>
            Lý tưởng (60-80%)
          </Text>
        </View>
      </View>

      <Card className="rounded-[14px] p-[14px]">
        {areas.map((area, index) => {
          const color = getBarColor(area.moisture);
          return (
            <View key={index} className={index < areas.length - 1 ? "mb-4" : ""}>
              <View className="flex-row justify-between mb-1.5">
                <Text
                  className="text-[13px] font-medium"
                  style={{ color: Colors.mediumtaupe }}
                >
                  {area.name}
                </Text>
                <Text className="text-[13px] font-bold" style={{ color }}>
                  {area.moisture}%
                </Text>
              </View>
              {/* Progress bar */}
              <View
                className="w-full h-5 rounded-full overflow-hidden"
                style={{ backgroundColor: "#EDE6DE" }}
              >
                <View
                  className="h-full rounded-full"
                  style={{
                    width: `${area.moisture}%`,
                    backgroundColor: color,
                  }}
                />
              </View>
            </View>
          );
        })}

        <Text
          className="text-[10px] mt-3 italic leading-[15px]"
          style={{ color: Colors.softsoil }}
        >
          * Độ ẩm từ 60-80% là điều kiện tốt để cây ra quả. Tránh được việc tưới quá nhiều nước ở vùng công nghiệp tại Lâm Đồng. Khu vườn B cần được bổ sung nước tưới.
        </Text>
      </Card>
    </View>
  );
};
