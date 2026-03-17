import { ICONS } from "@/assets/icons";
import { Colors } from "@/constant/Colors";
import { ScrollView, Text, View } from "react-native";
import { FarmMetricCard } from "./common/FarmMetricCard";
import { FarmHealthCard } from "./components/FarmHealthCard ";
import { HomeHeader } from "./components/HomeHeader";
import { WeatherCard } from "./components/WeatherCard";
import { TaskItem } from "./common/TaskItem";

const farmMetricsData = [
  {
    name: "Độ ẩm đất",
    value: "45",
    icons: ICONS.iconHumidity,
  },
  {
    name: "Nhiệt độ",
    value: "30",
    icons: ICONS.iconTemperature,
  },
];

const tasksData = [
  {
    nameWork: "Tưới nước lô cà phê A",
    note: "10:00 AM - 12:00 PM",
  },
  {
    nameWork: "Phun thuốc lô cà phê B",
    note: "2:00 PM - 4:00 PM",
  },
];

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader />
      <ScrollView className="px-[20px]"
      contentContainerStyle={{paddingTop: 20, paddingBottom: 20}}
      showsVerticalScrollIndicator={false}
      >
        <WeatherCard />
        <FarmHealthCard />
        <View className="mt-5 flex-row justify-between">
          {farmMetricsData.map((item, index) => {
            return (
              <FarmMetricCard
                key={index}
                name={item.name}
                value={item.value}
                icons={item.icons}
              />
            );
          })}
        </View>
        <View className="flex-row justify-between items-center mt-5 w-full">
          <Text
            className="font-bold text-[20px]"
            style={{ color: Colors.brownearth }}
          >
            Công việc hôm nay
          </Text>
          <Text
            className="font-semibold text-[14px]"
            style={{ color: Colors.forestgreen }}
          >
            Xem tất cả
          </Text>
        </View>
        {tasksData.map((task, index) => (
          <TaskItem
            key={index}
            nameWork={task.nameWork}
            note={task.note}
          />
        ))}
      </ScrollView>
    </View>
  );
}
