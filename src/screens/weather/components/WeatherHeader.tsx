import { Colors } from "@/constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const WeatherHeader = ({location}: {location: string}) => {
  const router = useRouter();
  const [now, setNow] = useState(dayjs())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const timeLabel = now.format("HH:mm A")
  return (
    <View
      className="w-full flex-row items-center justify-between px-[20px] py-[12px]"
      style={{
        backgroundColor: Colors.offwhite,
        borderBottomWidth: 1,
        borderBottomColor: "#F0EDE8",
      }}
    >
      <TouchableOpacity onPress={() => router.back()} className="p-1">
        <Ionicons name="triangle-outline" size={22} color={Colors.forestgreen} />
      </TouchableOpacity>
      <View className="items-center">
        <Text
          className="font-bold text-[17px]"
          style={{ color: Colors.forestgreen }}
        >
          {location}
        </Text>
        <Text className="text-[11px] mt-0.5" style={{ color: Colors.softsoil }}>
          Cập nhật {timeLabel}
        </Text>
      </View>
      <TouchableOpacity className="p-1">
        <Ionicons name="search-outline" size={22} color={Colors.mediumtaupe} />
      </TouchableOpacity>
    </View>
  );
};
