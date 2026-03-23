import { Colors } from "@/constant/Colors";
import { Image, Text, View } from "react-native";

type WeatherProps = {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
};

export const WeatherCard = (props: WeatherProps) => {
  return (
    <View
      className="p-[20px] rounded-[24px] flex-row justify-between"
      style={{ backgroundColor: Colors.leafgreen }}
    >
      <View>
        <Text
          className="font-bold text-[18px]"
          style={{ color: Colors.offwhite }}
        >
          Trạm: {props.location}
        </Text>
        <Text
          className="font-bold text-[48px]"
          style={{ color: Colors.offwhite }}
        >
          {props.temperature}°C
        </Text>
        <Text className="text-[14px]" style={{ color: Colors.offwhite }}>
          Độ ẩm: {props.humidity}% . Gió: {props.windSpeed} km/h
        </Text>
      </View>
      <View className="flex-row items-center gap-1">
        <Text className="text-[14px] w-20" style={{ color: Colors.offwhite }}>
          {props.description}
        </Text>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${props.icon}@2x.png`,
          }}
          style={{ width: 50, height: 50 }}
        />
      </View>
    </View>
  );
};
