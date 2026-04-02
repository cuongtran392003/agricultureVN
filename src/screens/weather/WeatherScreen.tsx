import { Colors } from "@/constant/Colors";
import { useWeather } from "@/hooks/useWeather";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";
import { RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CurrentWeather } from "./components/CurrentWeather";
import { FarmAdvice } from "./components/FarmAdvice";
import { HourlyForecast } from "./components/HourlyForecast";
import { RainfallChart } from "./components/RainfallChart";
import { SoilMoisture } from "./components/SoilMoisture";
import { WeatherHeader } from "./components/WeatherHeader";
import { WeeklyForecast } from "./components/WeeklyForecast";

export const WeatherScreen = () => {
  const { data, refetch, isRefetching } = useWeather();
  const {
    hourlyData,
    dailyData,
    refetch: refetchForecast,
    isRefetching: isRefetchingForecast,
  } = useWeatherForecast();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F6F3" }}>
      <WeatherHeader location={data?.name} />
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            tintColor={Colors.forestgreen}
            refreshing={isRefetching || isRefetchingForecast}
            onRefresh={() => {
              refetch();
              refetchForecast();
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <CurrentWeather
          data={data}
          temp={data?.main?.temp}
          description={data?.weather[0]?.description}
        />
        <FarmAdvice />
        <HourlyForecast data={hourlyData} />
        <SoilMoisture />
        <WeeklyForecast data={dailyData} />
        <RainfallChart />
      </ScrollView>
    </SafeAreaView>
  );
};
