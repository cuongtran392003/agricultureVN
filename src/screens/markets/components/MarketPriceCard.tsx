import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { View } from "@/components/ui/view";
import { Colors } from "@/constant/Colors";
import { ICONS } from "assets/icons";
import { Text } from "react-native";
import { MiniChart } from "../common/MiniChart";

type MarketPriceCardProps = {
    name: string;
    price: string;
    change: string;
    history: number[];
}

export const MarketPriceCard = ({ name, price, change, history }: MarketPriceCardProps) => {
  return (
    <Card
      className="bg-white p-[16px] rounded-[16px] gap-y-2 w-[171px] h-[198px] justify-center mt-4"
      style={{ borderColor: Colors.brownearth, borderWidth: 1 }}
    >
      <View className="w-full flex-row gap-2 items-center">
        <Image source={ICONS.iconCoffee} className="w-5 h-5" />
        <Text
          className="text-[14px] font-bold"
          style={{ color: Colors.brownearth }}
        >
            {name}
        </Text>
      </View>
      <Text
        className="text-[16px] font-bold"
        style={{ color: Colors.forestgreen }}
      >
        {price}
      </Text>
      <View className="w-full flex-row items-center gap-4">
        <Image
          source={ICONS.iconTrendingUp}
          className="w-2 h-2 "
          style={{ resizeMode: "cover" }}
        />
        <Text className="text-[12px] " style={{ color: Colors.forestgreen }}>
          {change}
        </Text>
      </View>
      <MiniChart data={history} />
    </Card>
  );
};
