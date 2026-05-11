import { Card } from "@/components/ui/card";
import { Colors } from "@/constant/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  name?: string;
  onPress: () => void;
};
export const ProfileInfo = ({ name, onPress }: Props) => {
  return (
    <View className="px-[24px]">
      <Text
        className="font-bold text-[16px] mb-3"
        style={{ color: Colors.brownearth }}
      >
        THÔNG TIN CÁ NHÂN
      </Text>
      <Card className="rounded-[12px]">
        {/* Họ và tên */}
        <TouchableOpacity
          className="flex-row items-center justify-between p-3"
          onPress={onPress}
        >
          <View className="flex-row gap-3 items-center flex-1">
            <View
              className="w-[40px] h-[40px] items-center justify-center rounded-full"
              style={{ backgroundColor: Colors.forestgreen }}
            >
              <FontAwesome name="user" size={20} color={Colors.offwhite} />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-[14px]">Họ và tên</Text>
              <Text
                className="text-[12px] mt-0.5"
                style={{ color: Colors.softsoil }}
              >
                {name}
              </Text>
            </View>
          </View>
          <FontAwesome name="chevron-right" size={16} color={Colors.softsoil} />
        </TouchableOpacity>

        {/* Divider */}
        <View
          className="mx-3"
          style={{ height: 1, backgroundColor: Colors.lightgray }}
        />

        {/* Loại cây trồng */}
        <TouchableOpacity className="flex-row items-center justify-between p-3">
          <View className="flex-row gap-3 items-center flex-1">
            <View
              className="w-[40px] h-[40px] items-center justify-center rounded-full"
              style={{ backgroundColor: Colors.forestgreen }}
            >
              <FontAwesome name="leaf" size={20} color={Colors.offwhite} />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-[14px]">Loại cây trồng</Text>
              <Text
                className="text-[12px] mt-0.5"
                style={{ color: Colors.softsoil }}
              >
                Lúa nước, Sầu riêng, Bưởi
              </Text>
            </View>
          </View>
          <FontAwesome name="chevron-right" size={16} color={Colors.softsoil} />
        </TouchableOpacity>
      </Card>
    </View>
  );
};
