import { Colors } from "@/constant/Colors";
import {
  useDeleteTask,
  useGetAllTask,
  useUpdateTask,
} from "@/hooks/api/tasks/useTask";
import { TaskResponse } from "@/types/tasks";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { TaskSummaryCard } from "./common/TaskSummaryCard";
import { FloatButton } from "./components/FloatButton";
import { ScheduleHeader } from "./components/SheduleHeader";
import { TaskTodaySchedule } from "./components/TaskTodaySchedule";
import { UpcomingTask } from "./components/UpcomingTask";
import { WeekCalendar } from "./components/WeekCalendar";

dayjs.locale("vi");

export const ScheduleScreen = () => {
  const [now, setNow] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { data: dataTask } = useGetAllTask();
  const { mutateAsync: updateTask } = useUpdateTask();
  const { mutateAsync: deleteTask } = useDeleteTask();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 60000); // Cập nhật mỗi 60 giây
    return () => clearInterval(interval);
  }, []);

  const dateLabel = selectedDate.format("dddd, DD/MM");

  const tasksToday =
    dataTask?.data?.filter(
      (task: TaskResponse) =>
        dayjs(task.scheduledDate).format("dddd, DD/MM") === dateLabel,
    ) || [];

  const upcomingTasks =
    dataTask?.data?.filter((task: TaskResponse) =>
      dayjs(task.scheduledDate).isAfter(selectedDate, "day"),
    ) || [];

  const totalCompleted =
    tasksToday.filter((task: TaskResponse) => task.status === "completed")
      .length || 0;
  const totalPending =
    tasksToday.filter((task: TaskResponse) => task.status === "pending")
      .length || 0;

  const handleOnMarkDown = async (id: string) => {
    try {
      await updateTask({id, status: "completed" });
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Thành công", "Hoàn thành công việc");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Thành công", "Bạn có muốn xóa công việc này không ?", [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () => deleteTask(id),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <ScheduleHeader />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 16,
          paddingTop: 10,
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInUp.delay(300).springify().damping(15).stiffness(100)}
        >
          <WeekCalendar
            eventDates={[3, 9, 12]}
            onDateSelect={(dateStr) => setSelectedDate(dayjs(dateStr))}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInUp.delay(400).springify().damping(15).stiffness(100)}
          className="flex-row w-full justify-between mt-5"
        >
          <TaskSummaryCard label="completed" totalTasks={totalCompleted} />
          <TaskSummaryCard label="pending" totalTasks={totalPending} />
        </Animated.View>
        <Animated.View
          entering={FadeInUp.delay(500).springify().damping(15).stiffness(100)}
          className="flex-row w-full justify-between items-center mt-5"
        >
          <Text className="font-bold text-[18px]">Nhiệm vụ hôm nay</Text>
          <View className="p-2 bg-[#EDE6DE] rounded-full">
            <Text
              className="font-medium text-[12px]"
              style={{ color: Colors.brownearth }}
            >
              {dateLabel}
            </Text>
          </View>
        </Animated.View>

        {tasksToday.length === 0 && (
          <Text className="text-gray-500 mt-4 text-center">
            Không có công việc nào trong ngày này
          </Text>
        )}

        {tasksToday.map((task: TaskResponse, index: number) => {
          return (
            <Animated.View
              key={`today-${index}`}
              entering={FadeInUp.delay(600 + index * 100)
                .springify()
                .damping(15)
                .stiffness(100)}
            >
              <TaskTodaySchedule
                title={task.title}
                subtitle={task.plotId?.name || ""}
                time={task.scheduledTime}
                location={task.farmId?.name || ""}
                status={task.status}
                onMarkDone={() => {
                  console.log("mark done", task._id);
                  handleOnMarkDown(task._id);
                }}
                onEdit={() => {
                  console.log("edit", task._id);
                }}
                onDelete={() => {
                  console.log("delete", task._id);
                  handleDeleteTask(task._id);
                }}
              />
            </Animated.View>
          );
        })}
        <Animated.View
          entering={FadeInUp.delay(800).springify().damping(15).stiffness(100)}
          className="w-full mt-6"
        >
          <Text className="font-bold text-[18px]">Công việc sắp tới</Text>
          {upcomingTasks.length === 0 && (
            <Text className="text-gray-500 mt-4 text-center">
              Không có công việc sắp tới
            </Text>
          )}
          {upcomingTasks.map((task: TaskResponse, index: number) => {
            return (
              <Animated.View
                key={`upcoming-${index}`}
                entering={FadeInUp.delay(900 + index * 100)
                  .springify()
                  .damping(15)
                  .stiffness(100)}
              >
                <UpcomingTask
                  title={task?.title}
                  subTitle={task?.plotId?.name}
                  time={task?.scheduledTime}
                />
              </Animated.View>
            );
          })}
        </Animated.View>
      </ScrollView>
      <FloatButton />
    </View>
  );
};
