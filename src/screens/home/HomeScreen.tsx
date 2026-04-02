import { Skeleton } from "@/components/Skeleton";
import { Colors } from "@/constant/Colors";
import { useGetAllTask } from "@/hooks/api/tasks/useTask";
import { useWeather } from "@/hooks/useWeather";
import { ICONS } from "assets/icons";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { FarmMetricCard } from "./common/FarmMetricCard";
import { TaskItem } from "./common/TaskItem";
import { FarmHealthCard } from "./components/FarmHealthCard ";
import { HomeHeader } from "./components/HomeHeader";
import { WeatherCard } from "./components/WeatherCard";
import { TaskResponse } from "../../types/tasks";

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

type WeatherData = {
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    humidity: number;
    temp: number;
  };
  name: string;
  weather: [
    {
      id: number;
      description: string;
      icon: string;
      main: string;
    },
  ];
  wind: {
    deg: number;
    speed: number;
  };
};

export default function HomeScreen() {
  const { data, isLoading, refetch, isRefetching } = useWeather();
  const {
    data: taskData,
    isLoading: taskLoading,
    refetch: taskRefetch,
    isRefetching: taskIsRefetching,
  } = useGetAllTask();

  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <HomeHeader data={data} />
      {isLoading ? (
        <View className="px-5 pt-5 gap-y-5 flex-1">
          <Skeleton width="100%" height={160} borderRadius={24} />
          <Skeleton width="100%" height={260} borderRadius={24} />
          <View className="flex-row justify-between w-full mt-4">
            <Skeleton width="48%" height={120} borderRadius={24} />
            <Skeleton width="48%" height={120} borderRadius={24} />
          </View>
        </View>
      ) : (
        <ScrollView
          className="flex-1 px-[20px]"
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching || taskIsRefetching}
              onRefresh={() => {
                refetch();
                taskRefetch();
              }}
              colors={[Colors.forestgreen]}
              tintColor={Colors.forestgreen}
            />
          }
        >
          {data && (
            <Animated.View
              entering={FadeInUp.delay(100)
                .springify()
                .damping(15)
                .stiffness(100)}
            >
              <WeatherCard
                location={data?.name}
                temperature={Math.round(data.main.temp)}
                humidity={data.main.humidity}
                windSpeed={data.wind.speed}
                description={data?.weather[0]?.description}
                icon={data?.weather[0]?.icon}
              />
            </Animated.View>
          )}

          <Animated.View
            entering={FadeInUp.delay(200)
              .springify()
              .damping(15)
              .stiffness(100)}
          >
            <FarmHealthCard />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(300)
              .springify()
              .damping(15)
              .stiffness(100)}
            className="mt-5 flex-row justify-between"
          >
            {farmMetricsData.map((item, index) => {
              const value =
                item.name === "Độ ẩm đất"
                  ? `${data?.main.humidity}%`
                  : `${Math.round(data?.main.temp || 0)}°C`;
              return (
                <FarmMetricCard
                  key={index}
                  name={item.name}
                  value={value}
                  icons={item.icons}
                />
              );
            })}
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(400)
              .springify()
              .damping(15)
              .stiffness(100)}
            className="flex-row justify-between items-center mt-6 mb-2 w-full"
          >
            <Text
              className="font-bold text-[20px]"
              style={{ color: Colors.brownearth }}
            >
              Công việc hôm nay
            </Text>
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text
                className="font-semibold text-[14px]"
                style={{ color: Colors.forestgreen }}
              >
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {taskData &&
            taskData?.data &&
            taskData?.data?.map((task: TaskResponse, index: number) => (
              <Animated.View
                key={index}
                entering={FadeInUp.delay(500 + index * 100)
                  .springify()
                  .damping(15)
                  .stiffness(100)}
              >
                <TaskItem nameWork={task.title} note={task.note} />
              </Animated.View>
            ))}
        </ScrollView>
      )}
    </View>
  );
}
