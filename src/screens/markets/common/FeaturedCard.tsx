import { Card } from "@/components/ui/card";
import { Colors } from "@/constant/Colors";
import { IMAGES } from "assets/images";
import { Image, Text, View } from "react-native";

export const FeaturedCard = () => {
  return (
    <Card
      className="w-full rounded-[16px] overflow-hidden mb-2"
      style={{
        gap: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.03)",
      }}
    >
      <Image
        source={IMAGES.imageLogin}
        style={{ width: "100%", height: 180, borderRadius: 16 }}
        resizeMode="cover"
      />
      <View className="p-3 gap-2">
        <View className="flex-row items-center gap-2">
          <View
            style={{
              backgroundColor: Colors.lightyellow,
              paddingHorizontal: 6,
              paddingVertical: 3,
              borderRadius: 4,
            }}
          >
            <Text className="font-bold text-[10px] uppercase">Tây Nguyên</Text>
          </View>
          <Text className="text-[12px]" style={{ color: Colors.brownearth }}>
            5 phút trước
          </Text>
        </View>
        <Text
          className="font-bold text-[16px]"
          style={{ color: Colors.forestgreen }}
        >
          Mô hình xen canh cà phê - Sầu riêng bền vững tại Đăk Lăk
        </Text>
        <Text
          className="font-inter text-[14px]"
          style={{ color: Colors.brownearth }}
        >
          Chia sẻ kinh nghiệm quản lý nguồn nước và bón phân hữu cơ giúp tăng
          năng suất gấp 1,5 lần ...
        </Text>
      </View>
    </Card>
  );
};
