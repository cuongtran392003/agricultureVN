import { Colors } from "@/constant/Colors";
import { getWeatherService } from "@/services/service.weather";
import { ICONS } from "assets/icons";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { FarmMetricCard } from "./common/FarmMetricCard";
import { TaskItem } from "./common/TaskItem";
import { FarmHealthCard } from "./components/FarmHealthCard ";
import { HomeHeader } from "./components/HomeHeader";
import { WeatherCard } from "./components/WeatherCard";
import { useWeather } from "@/hooks/useWeather";

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
  
  const {data, isLoading, refetch, isRefetching} = useWeather()

  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={data} />
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={Colors.brownearth} />
        </View>
      ) : (
        <ScrollView
          className="px-[20px]"
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              colors={[Colors.forestgreen]}
              tintColor={Colors.forestgreen}
            />
          }
        >
          {data && (
            <WeatherCard
              location={data?.name}
              temperature={Math.round(data.main.temp)}
              humidity={data.main.humidity}
              windSpeed={data.wind.speed}
              description={data?.weather[0]?.description}
              icon={data?.weather[0]?.icon}
            />
          )}
          <FarmHealthCard />
          <View className="mt-5 flex-row justify-between">
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
            <TaskItem key={index} nameWork={task.nameWork} note={task.note} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
