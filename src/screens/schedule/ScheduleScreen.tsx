import { Colors } from "@/constant/Colors";
import { useGetAllTask } from "@/hooks/api/tasks/useTask";
import { TaskResponse } from "@/types/tasks";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { TaskSummaryCard } from "./common/TaskSummaryCard";
import { FloatButton } from "./components/FloatButton";
import { ScheduleHeader } from "./components/SheduleHeader";
import { UpcomingTask } from "./components/UpcomingTask";
import { WeekCalendar } from "./components/WeekCalendar";
import { SwipeableTaskTodaySchedule } from "./components/SwipeableTaskTodaySchedule";

dayjs.locale("vi");

const taskTodaySchedule = [
  {
    title: "Tưới cây",
    subtitle: "Vườn rau nhà A",
    time: "08:00 - 09:00",
    location: "Vườn rau nhà A",
    status: "upcoming",
    onMarkDone: () => console.log("Đánh dấu xong"),
  },
  {
    title: "Thu hoạch",
    subtitle: "Vườn rau nhà B",
    time: "10:00 - 11:00",
    location: "Vườn rau nhà B",
    status: "upcoming",
    onMarkDone: () => console.log("Đánh dấu xong"),
  },
  {
    title: "Bón phân",
    subtitle: "Vườn rau nhà C",
    time: "Hoàn thành lúc 12:00",
    location: "Vườn rau nhà C",
    status: "completed",
    onMarkDone: () => console.log("Đánh dấu xong"),
  },
];

export const ScheduleScreen = () => {
  const [now, setNow] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { data: dataTask } = useGetAllTask();
  console.log(">>> check schedule date", dataTask?.data);

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
    dataTask?.data?.filter((task: TaskResponse) => task.status === "completed")
      .length || 0;
  const totalPending =
    dataTask?.data?.filter((task: TaskResponse) => task.status === "pending")
      .length || 0;

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
              <SwipeableTaskTodaySchedule
                task={task}
                onMarkDone={() => {
                  console.log("mark done", task._id);
                }}
                onDelete={(taskId) => {
                  console.log("delete task", taskId);
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
