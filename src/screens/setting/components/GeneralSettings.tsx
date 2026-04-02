import { Card } from "@/components/ui/card";
import { Colors } from "@/constant/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface SettingRowProps {
  icon: string;
  title: string;
  subtitle?: string;
  isLast?: boolean;
}

const SettingRow = ({ icon, title, subtitle, isLast }: SettingRowProps) => (
  <>
    <TouchableOpacity className="flex-row items-center justify-between p-3">
      <View className="flex-row gap-3 items-center flex-1">
        <View
          className="w-[40px] h-[40px] items-center justify-center rounded-full"
          style={{ backgroundColor: Colors.forestgreen }}
        >
          <FontAwesome
            name={icon as any}
            size={18}
            color={Colors.offwhite}
          />
        </View>
        <View className="flex-1">
          <Text className="font-bold text-[14px]">{title}</Text>
          {subtitle && (
            <Text
              className="text-[12px] mt-0.5"
              style={{ color: Colors.softsoil }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <FontAwesome name="chevron-right" size={16} color={Colors.softsoil} />
    </TouchableOpacity>
    {!isLast && (
      <View
        className="mx-3"
        style={{ height: 1, backgroundColor: Colors.lightgray }}
      />
    )}
  </>
);

export const GeneralSettings = () => {
  return (
    <View className="px-[24px] mt-5">
      <Text
        className="font-bold text-[16px] mb-3"
        style={{ color: Colors.brownearth }}
      >
        CÀI ĐẶT CHUNG
      </Text>
      <Card className="rounded-[12px]">
        <SettingRow icon="globe" title="Ngôn ngữ" subtitle="Tiếng Việt" />
        <SettingRow icon="lock" title="Đổi mật khẩu" />
        <SettingRow
          icon="file-text-o"
          title="Điều khoản & Chính sách"
          isLast
        />
      </Card>
    </View>
  );
};
