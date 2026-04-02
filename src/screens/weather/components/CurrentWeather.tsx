import { Colors } from "@/constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export const CurrentWeather = ({data, temp, description}: {data: any, temp: string, description: string}) => {
  return (
    <View className="px-[24px] pt-6 pb-4">
      {/* Temperature row */}
      <View className="flex-row items-start justify-between">
        <View>
          <Text
            className="text-[52px] font-bold"
            style={{ color: Colors.mediumtaupe, lineHeight: 58 }}
          >
            {temp} °C
          </Text>
          <Text
            className="text-[14px] font-medium mt-1"
            style={{ color: Colors.softsoil }}
          >
            {description}
          </Text>
        </View>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@4x.png`,
          }}
          style={{ width: 90, height: 90, marginTop: -8 }}
        />
      </View>

      {/* Stats row */}
      <View
        className="flex-row items-center justify-between mt-5 pt-4"
        style={{ borderTopWidth: 1, borderTopColor: "#EDE6DE" }}
      >
        <StatItem icon="water-outline" value={data?.main?.humidity + "%"} label="ĐỘ ẨM" />
        <StatItem icon="speedometer-outline" value={data?.wind?.speed + " km/h"} label="GIÓ" />
        <StatItem icon="eye-outline" value={data?.visibility + " km"} label="TẦM NHÌN" />
      </View>
    </View>
  );
};

const StatItem = ({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) => (
  <View className="items-center gap-1">
    <Ionicons name={icon as any} size={20} color={Colors.brandorange} />
    <Text
      className="font-bold text-[15px]"
      style={{ color: Colors.mediumtaupe }}
    >
      {value}
    </Text>
    <Text className="text-[10px] tracking-[1px]" style={{ color: Colors.softsoil }}>
      {label}
    </Text>
  </View>
);
