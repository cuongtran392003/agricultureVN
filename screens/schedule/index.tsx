import { Colors } from "@/constant/Colors";
import { ScrollView, Text, View } from "react-native";
import { TaskSummaryCard } from "./common/TaskSummaryCard";
import { ScheduleHeader } from "./components/SheduleHeader";
import { TaskTodaySchedule } from "./components/TaskTodaySchedule";
import { WeekCalendar } from "./components/WeekCalendar";

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
  return (
    <View style={{ flex: 1 }}>
      <ScheduleHeader />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
          paddingTop: 10,
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <WeekCalendar
          eventDates={[3, 9, 12]}
          onDateSelect={(date) => console.log("Chọn ngày", date)}
        />
        <View className="flex-row w-full justify-between mt-5">
          <TaskSummaryCard label="completed" totalTasks={12} />
          <TaskSummaryCard label="upcoming" totalTasks={5} />
        </View>
        <View className="flex-row w-full justify-between items-center mt-5">
          <Text className="font-bold text-[18px]">Nhiệm vụ hôm nay</Text>
          <View className="p-2 bg-[#EDE6DE] rounded-full">
            <Text
              className="font-medium text-[12px]"
              style={{ color: Colors.brownearth }}
            >
              Thứ 5, 12/10
            </Text>
          </View>
        </View>
        {taskTodaySchedule.map((task, index) => {
          return (
            <TaskTodaySchedule
              key={index}
              title={task.title}
              subtitle={task.subtitle}
              time={task.time}
              location={task.location}
              status={task.status}
              onMarkDone={task.onMarkDone}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
