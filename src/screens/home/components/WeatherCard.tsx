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
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        router.navigate("/weather" as any);
      }}
      className="w-full p-5 rounded-3xl flex-row justify-between items-center"
      style={{
        backgroundColor: Colors.leafgreen,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
      }}
    >
      {/* Cột trái: Thông tin chính */}
      <View className="flex-1 mr-2">
        <Text
          className="font-semibold text-[15px] mb-1 opacity-90"
          numberOfLines={1}
          style={{ color: Colors.offwhite }}
        >
          Trạm {props.location || "..."}
        </Text>
        
        <View className="flex-row items-start my-1">
          <Text
            className="font-bold text-[56px] leading-[60px]"
            style={{ color: Colors.offwhite }}
          >
            {Math.round(props.temperature)}
          </Text>
          <Text
            className="font-bold text-[24px] mt-2 ml-1"
            style={{ color: Colors.offwhite }}
          >
            °C
          </Text>
        </View>

        <Text 
          className="text-[13px] font-medium mt-1 opacity-90" 
          style={{ color: Colors.offwhite }}
        >
          Độ ẩm: {props.humidity}%   Gió: {props.windSpeed} km/h
        </Text>
      </View>

      {/* Cột phải: Icon & Mô tả thời tiết */}
      <View className="items-center justify-center w-[100px]">
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${props.icon}@4x.png`,
          }}
          style={{ width: 90, height: 90, marginBottom: -10 }}
          resizeMode="contain"
        />
        <Text 
          className="text-[15px] font-bold capitalize text-center mt-1" 
          numberOfLines={2}
          style={{ color: Colors.offwhite }}
        >
          {props.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

