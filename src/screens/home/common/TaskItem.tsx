import { Colors } from "@/constant/Colors";
import { TaskItemProps } from "@/types/home";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";

export const TaskItem = ({
  nameWork,
  note,
  id,
  status,
  onPress,
}: TaskItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row gap-4 items-center p-[16px] rounded-[20px] mt-4 mb-2"
      style={{
        borderLeftWidth: 4,
        borderLeftColor: status === "completed" ? Colors.success : Colors.sunlightyellow,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 9,
        elevation: 3,
      }}
      onPress={onPress}
    >
      <View
        className="w-[24px] h-[24px] rounded-[4px]"
        style={{
          borderColor: status === "completed" ? Colors.success : Colors.lightgray,
          borderWidth: 2,
          backgroundColor: status === "completed" ? Colors.surfaceMuted : Colors.offwhite,
        }}
      >
        {status === "completed" ? (
          <FontAwesome name="check" size={24} color={Colors.forestgreen} />
        ) : (
          null
        )}
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text localize={false}
          className="font-semibold text-[16px]"
          numberOfLines={2}
          style={{ color: Colors.brownearth }}
        >
          {nameWork}
        </Text>
        <Text localize={false}
          className="text-[12px] mt-1"
          numberOfLines={2}
          style={{ color: Colors.brownearth }}
        >
          {note}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
