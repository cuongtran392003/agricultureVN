import { Card } from "@/components/ui/card";
import { Colors } from "@/constant/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface HistoryItem {
  id: string;
  title: string;
  crop: string;
  time: string;
  image?: any;
}

const historyData: HistoryItem[] = [
  {
    id: "1",
    title: "Gỉ sắt trên lá cà phê",
    crop: "Cà phê",
    time: "Đã phát hiện • 2 giờ trước",
    image: null,
  },
  {
    id: "2",
    title: "Sâu xanh hại cà chua",
    crop: "Cà chua",
    time: "Đã phát hiện • Hôm qua",
    image: null,
  },
];

const HistoryRow = ({ item }: { item: HistoryItem }) => (
  <TouchableOpacity className="flex-row items-center justify-between p-3">
    <View className="flex-row gap-3 items-center flex-1">
      <View
        className="w-[48px] h-[48px] rounded-[12px] items-center justify-center"
        style={{ backgroundColor: "#E8F5E9" }}
      >
        <FontAwesome name="leaf" size={22} color={Colors.forestgreen} />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-[14px]" numberOfLines={1}>
          {item.title}
        </Text>
        <Text
          className="text-[11px] mt-1"
          style={{ color: Colors.softsoil }}
        >
          {item.time}
        </Text>
      </View>
    </View>
    <FontAwesome name="chevron-right" size={14} color={Colors.softsoil} />
  </TouchableOpacity>
);

export const DiagnosisHistory = () => {
  return (
    <View className="px-[20px] mt-4">
      {/* Section header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="font-bold text-[17px]">Lịch sử chẩn đoán</Text>
        <TouchableOpacity>
          <Text
            className="font-semibold text-[13px]"
            style={{ color: Colors.forestgreen }}
          >
            Xem tất cả
          </Text>
        </TouchableOpacity>
      </View>

      {/* History list */}
      <Card className="rounded-[12px]">
        {historyData.map((item, index) => (
          <View key={item.id}>
            <HistoryRow item={item} />
            {index < historyData.length - 1 && (
              <View
                className="mx-3"
                style={{ height: 1, backgroundColor: Colors.lightgray }}
              />
            )}
          </View>
        ))}
      </Card>
    </View>
  );
};
