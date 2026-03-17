import { ICONS } from "@/assets/icons";
import { Colors } from "@/constant/Colors";
import { View,Text,Image } from "react-native";


export const WeatherCard = () => {
    return (
        <View className="p-[20px] rounded-[24px] flex-row justify-between" style={{backgroundColor:Colors.leafgreen}}>
            <View>
                <Text className="font-bold text-[18px]" style={{color:Colors.offwhite}}>Trạm: Di linh</Text>
                <Text className="font-bold text-[48px]" style={{color:Colors.offwhite}}>22°C</Text>
                <Text className="text-[14px]" style={{color:Colors.offwhite}}>Độ ẩm: 85% . Gió: 5 km/h</Text>
            </View>
            <View className="flex-row items-center gap-2">
                <Text className="text-[14px]" style={{color:Colors.offwhite}}>Có sương mù nhẹ</Text>
                <Image source={ICONS.iconCloud} />
            </View>
        </View>
    )
}