import { ICONS } from "assets/icons";
import { Colors } from "@/constant/Colors";
import { TaskSummaryCardProps } from "@/types/schedule";
import { Image, View,Text } from "react-native";



const LABELS ={
    completed: 'Đã hoàn thành',
    pending: 'Chờ thực hiện'
}

export const TaskSummaryCard = (props: TaskSummaryCardProps) => {
  return (
    <View className="flex-row gap-3 h-[69.5px] items-center justify-center rounded-[12px]"
    style={{backgroundColor:props.label === "completed" ? '#E1EDE6' : '#EDE6DE', width: '48%'}}
    >
      <View
        style={{ backgroundColor: props.label === "completed" ? Colors.forestgreen : Colors.brownearth }}
        className="items-center justify-center p-2 rounded-lg w-[36px] h-[36px]"
      >
        {
            props.label === "completed" ? (
                <Image source={ICONS.iconTickWhite}/>
            )
            :
            (
                <Image source={ICONS.iconTimeWhite}/>
            )
        }
      </View>
      <View>
        <Text className="font-bold text-[20px]" style={{color: props.label === "completed" ? Colors.forestgreen : Colors.brownearth}}>
          {props.totalTasks}
        </Text>
        <Text className="text-[12px] font-semibold">{LABELS[props.label]}</Text>
      </View>
    </View>
  );
};
