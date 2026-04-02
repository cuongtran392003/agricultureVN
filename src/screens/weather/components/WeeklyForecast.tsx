import { Card } from "@/components/ui/card";
import { Colors } from "@/constant/Colors";
import { DailyData } from "@/hooks/useWeatherForecast";
import { Image, Text, View } from "react-native";

interface WeeklyForecastProps {
  data: DailyData[];
}

export const WeeklyForecast = ({ data }: WeeklyForecastProps) => {
  if (!data || data.length === 0) return null;

  return (
    <View className="mt-5 px-[20px]">
      <Text
        className="font-bold text-[16px] mb-3"
        style={{ color: Colors.brownearth }}
      >
        Dự báo 7 ngày tới
      </Text>
      <Card className="rounded-[14px]">
        {data.map((item, index) => (
          <View key={index}>
            <View className="flex-row items-center px-[14px] py-[13px]">
              {/* Day */}
              <Text
                className="font-semibold text-[14px] w-[50px]"
                style={{
                  color: index === 0 ? Colors.brandorange : Colors.mediumtaupe,
                }}
              >
                {item.day}
              </Text>

              {/* Icon + description */}
              <View className="flex-row items-center flex-1 ml-1">
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png`,
                  }}
                  style={{ width: 30, height: 30 }}
                />
                <Text
                  className="text-[12px] ml-1 capitalize"
                  style={{ color: Colors.softsoil }}
                >
                  {item.description}
                </Text>
              </View>

              {/* High / Low */}
              <View className="flex-row items-center gap-2">
                <Text
                  className="font-bold text-[16px]"
                  style={{ color: Colors.mediumtaupe }}
                >
                  {item.high}
                </Text>
                <Text
                  className="text-[14px]"
                  style={{ color: Colors.softsoil }}
                >
                  {item.low}
                </Text>
              </View>
            </View>

            {index < data.length - 1 && (
              <View
                className="mx-3"
                style={{ height: 1, backgroundColor: "#EDE6DE" }}
              />
            )}
          </View>
        ))}
      </Card>
    </View>
  );
};
