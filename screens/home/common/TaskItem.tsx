import { Colors } from "@/constant/Colors"
import { TaskItemProps } from "@/types/home"
import { View,Text } from "react-native"



export const TaskItem = ({ nameWork, note }: TaskItemProps) => {
    return (
        <View className="flex-row gap-5 items-center p-[16px] bg-white rounded-[16px] mt-5"
        style={{borderLeftWidth: 5, borderLeftColor: Colors.brownearth}}
        >
            <View className="w-[24px] h-[24px] rounded-[4px]" style={{borderColor: Colors.brownearth, borderWidth: 2}}></View>
            <View>
                <Text className="font-semibold text-[16px]" style={{color: Colors.brownearth}}>{nameWork}</Text>
                <Text className="text-[12px]" style={{color: Colors.brownearth}}>{note}</Text>
            </View>
        </View>
    )
}