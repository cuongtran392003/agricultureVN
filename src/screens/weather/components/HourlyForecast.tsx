import { Card } from "@/components/ui/card";
import { Colors } from "@/constant/Colors";
import { HourlyData } from "@/hooks/useWeatherForecast";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface HourlyForecastProps {
  data: HourlyData[];
}

export const HourlyForecast = ({ data }: HourlyForecastProps) => {
  if (!data || data.length === 0) return null;

  return (
    <View className="mt-5 px-[20px]">
      {/* Section header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text
          className="font-bold text-[16px]"
          style={{ color: Colors.brownearth }}
        >
          Dự báo 24 giờ tới
        </Text>
        <TouchableOpacity>
          <Text
            className="font-semibold text-[13px]"
            style={{ color: Colors.brandorange }}
          >
            Xem thêm
          </Text>
        </TouchableOpacity>
      </View>

      {/* Hourly cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        {data.map((item, index) => {
          const isActive = index === 0;
          return (
            <Card
              key={index}
              className="items-center rounded-[16px] px-[12px] py-[10px]"
              style={{
                backgroundColor: isActive ? Colors.brandorange : Colors.offwhite,
                minWidth: 68,
                borderWidth: isActive ? 0 : 1,
                borderColor: "#EDE6DE",
              }}
            >
              <Text
                className="text-[11px] font-semibold"
                style={{
                  color: isActive ? "#fff" : Colors.softsoil,
                }}
              >
                {item.time}
              </Text>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png`,
                }}
                style={{ width: 34, height: 34, marginVertical: 4 }}
              />
              <Text
                className="text-[16px] font-bold"
                style={{
                  color: isActive ? "#fff" : Colors.mediumtaupe,
                }}
              >
                {item.temp}
              </Text>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
};
