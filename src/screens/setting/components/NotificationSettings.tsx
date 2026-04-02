import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Colors } from "@/constant/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";

export const NotificationSettings = () => {
  const [priceAlert, setPriceAlert] = useState(true);
  const [weatherAlert, setWeatherAlert] = useState(true);

  return (
    <View className="px-[24px] mt-5">
      <Text
        className="font-bold text-[16px] mb-3"
        style={{ color: Colors.brownearth }}
      >
        THÔNG BÁO & CẢNH BÁO
      </Text>
      <Card className="rounded-[12px]">
        {/* Giá nông sản */}
        <View className="flex-row items-center justify-between p-3">
          <View className="flex-row gap-3 items-center flex-1">
            <View
              className="w-[40px] h-[40px] items-center justify-center rounded-full"
              style={{ backgroundColor: Colors.leafgreen }}
            >
              <FontAwesome
                name="line-chart"
                size={18}
                color={Colors.offwhite}
              />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-[14px]">Giá nông sản</Text>
              <Text
                className="text-[11px] mt-0.5"
                style={{ color: Colors.softsoil }}
              >
                Biến động giá thị trường hàng ngày
              </Text>
            </View>
          </View>
          <Switch
            value={priceAlert}
            onValueChange={setPriceAlert}
            trackColor={{
              false: Colors.lightgray,
              true: Colors.forestgreen,
            }}
            thumbColor={Colors.offwhite}
          />
        </View>

        {/* Divider */}
        <View
          className="mx-3"
          style={{ height: 1, backgroundColor: Colors.lightgray }}
        />

        {/* Cảnh báo thời tiết */}
        <View className="flex-row items-center justify-between p-3">
          <View className="flex-row gap-3 items-center flex-1">
            <View
              className="w-[40px] h-[40px] items-center justify-center rounded-full"
              style={{ backgroundColor: Colors.leafgreen }}
            >
              <FontAwesome name="cloud" size={18} color={Colors.offwhite} />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-[14px]">Cảnh báo thời tiết</Text>
              <Text
                className="text-[11px] mt-0.5"
                style={{ color: Colors.softsoil }}
              >
                Mưa bão, hạn hán bất thường
              </Text>
            </View>
          </View>
          <Switch
            value={weatherAlert}
            onValueChange={setWeatherAlert}
            trackColor={{
              false: Colors.lightgray,
              true: Colors.forestgreen,
            }}
            thumbColor={Colors.offwhite}
          />
        </View>
      </Card>
    </View>
  );
};
