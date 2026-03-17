import { Colors } from "@/constant/Colors";
import { Text, View } from "react-native";
import { CropStatusItem } from "../common/CropStatusItem";
import { ICONS } from "@/assets/icons";

const cropStatusData = [
    {
        name: "Cây công nghiệp",
        status: "Tốt",
        icon: ICONS.iconCoffee
    },
    {
        name: "Cây ăn quả",
        status: "Rất tốt",
        icon: ICONS.iconDurian
    }
]

export const FarmHealthCard = () => {
  return (
    <View
      className="p-[24px] items-center rounded-[24px] gap-5 mt-[20px]"
      style={{ backgroundColor: Colors.forestgreen }}
    >
      <Text className="text-white font-bold text-[20px]">
        Sức khỏe trang trại
      </Text>
      <View
        className="items-center justify-center w-[120px] h-[120px] rounded-full"
        style={{
          backgroundColor: Colors.leafgreen,
          borderColor: "#C6FF00",
          borderWidth: 10,
        }}
      >
        <Text className="text-[#C6FF00] text-[24px] font-bold">85%</Text>
        <Text className="text-white text-[18px] font-bold">Tốt</Text>
      </View>
      {cropStatusData.map((item, index) => (
        <CropStatusItem key={index} {...item} />
      ))}
    </View>
  );
};
