import { Colors } from "@/constant/Colors";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

type WeatherProps = {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
};

export const WeatherCard = (props: WeatherProps) => {
  const router = useRouter()
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        router.navigate("/weather" as any);
      }}
      className="w-full p-[20px] rounded-[24px] flex-row justify-between items-center"
      style={{
        backgroundColor: Colors.leafgreen,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
      }}
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
    </TouchableOpacity>
  );
};
