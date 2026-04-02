import { Card } from "@/components/ui/card";
import { Colors } from "@/constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const FarmAdvice = () => {
  return (
    <View className="px-[20px]">
      <Card
        className="rounded-[14px] p-[14px]"
        style={{
          backgroundColor: "#FFF8E1",
          borderWidth: 1,
          borderColor: "#FFE082",
        }}
      >
        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="bulb-outline" size={18} color={Colors.brandorange} />
          <Text
            className="font-bold text-[14px]"
            style={{ color: Colors.brownearth }}
          >
            Lời khuyên nhà nông
          </Text>
        </View>
        <Text
          className="text-[13px] leading-[20px]"
          style={{ color: Colors.mediumtaupe }}
        >
          Dự báo trời sắp có mưa giông vào chiều tư trái.{" "}
          <Text className="font-bold" style={{ color: Colors.brandorange }}>
            Không nên bón phân
          </Text>{" "}
          hoặc phun thuốc trừ sâu trong hôm nay ạ. Hãy kiểm tra hệ thống thoát nước vận hành tốt nhé. Hãy kiểm tra hệ thống thoát nước vận hành ổn.
        </Text>
      </Card>
    </View>
  );
};
