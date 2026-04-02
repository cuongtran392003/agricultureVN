import { Colors } from "@/constant/Colors";
import { TaskTodaySchedule } from "./TaskTodaySchedule";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { router } from "expo-router";
import { TaskResponse } from "@/types/tasks";

type SwipeableTaskTodayScheduleProps = {
  task: TaskResponse;
  onMarkDone: () => void;
  onDelete: (taskId: string) => void;
};

export const SwipeableTaskTodaySchedule = ({
  task,
  onMarkDone,
  onDelete,
}: SwipeableTaskTodayScheduleProps) => {
  const renderRightActions = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "stretch",
          marginTop: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            
          }}
          style={{
            width: 80,
            backgroundColor: "#F59E0B",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
            marginLeft: 8,
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Sửa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert("Xóa công việc", "Bạn có chắc muốn xóa công việc này không?", [
              { text: "Hủy", style: "cancel" },
              {
                text: "Xóa",
                style: "destructive",
                onPress: () => onDelete(task._id),
              },
            ]);
          }}
          style={{
            width: 80,
            backgroundColor: "#EF4444",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
            marginLeft: 8,
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Xóa</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <TaskTodaySchedule
        title={task.title}
        subtitle={task.plotId?.name || ""}
        time={task.scheduledTime}
        location={task.farmId?.name || ""}
        status={task.status}
        onMarkDone={onMarkDone}
      />
    </Swipeable>
  );
};