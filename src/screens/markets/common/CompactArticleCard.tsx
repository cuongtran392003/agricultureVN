import { Card } from "@/components/ui/card";
import { Colors } from "@/constant/Colors";
import { Image, Text, TouchableOpacity, View } from "react-native";

type CompactArticleCardProps = {
  title: string;
  time: string;
  image: any;
};

export const CompactArticleCard = ({
  title,
  time,
  image,
}: CompactArticleCardProps) => {
  return (
    <TouchableOpacity>
      <Card
        className="w-full rounded-[16px] overflow-hidden"
        style={{ padding: 0 }}
      >
        <View className="flex-row items-center p-3 gap-3">
          <Image
            source={image}
            style={{ width: 72, height: 72, borderRadius: 10 }}
            resizeMode="cover"
          />
          <View className="w-full gap-1">
            <Text
              className="font-bold text-[14px]"
              style={{ color: Colors.forestgreen, height: 40, width: 200 }}
            >
              {title}
            </Text>
            <Text className="text-[12px]" style={{ color: Colors.brownearth }}>
              {time}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
