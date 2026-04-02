import { Colors } from "@/constant/Colors"
import { TaskItemProps } from "@/types/home"
import { View,Text } from "react-native"



import { TouchableOpacity } from "react-native"

export const TaskItem = ({ nameWork, note }: TaskItemProps) => {
    return (
        <TouchableOpacity 
            activeOpacity={0.7}
            className="flex-row gap-5 items-center p-[16px] bg-white rounded-[16px] mt-4 mb-2"
            style={{
                borderLeftWidth: 5, 
                borderLeftColor: Colors.brownearth,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
            }}
        >
            <View className="w-[24px] h-[24px] rounded-[4px]" style={{borderColor: Colors.brownearth, borderWidth: 2, backgroundColor: Colors.offwhite}}></View>
            <View>
                <Text className="font-semibold text-[16px]" style={{color: Colors.brownearth}}>{nameWork}</Text>
                <Text className="text-[12px] mt-1" style={{color: Colors.brownearth}}>{note}</Text>
            </View>
        </TouchableOpacity>
    )
}