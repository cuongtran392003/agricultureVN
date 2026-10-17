import { Colors } from "@/constant/Colors";
import { useWeather } from "@/hooks/useWeather";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";
import { RefreshControl, ScrollView } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import Animated, { FadeInDown } from "react-native-reanimated";
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
    rainForecast,
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
        contentContainerStyle={{ paddingBottom: 28 }}
      >
        <Animated.View entering={FadeInDown.duration(420)}>
          <CurrentWeather
            data={data}
            temp={data?.main?.temp}
            description={data?.weather[0]?.description}
          />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(70).duration(420)} className="mx-5 mt-2 rounded-[20px] p-4" style={{ backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border }}>
          <Text className="text-[12px] font-bold tracking-[1.3px]" style={{ color: Colors.leafgreen }}>GỢI Ý CANH TÁC</Text>
          <Text className="font-bold text-[17px] mt-1" style={{ color: Colors.textPrimary }}>Lên kế hoạch theo diễn biến thời tiết</Text>
          <Text className="text-[13px] mt-1" style={{ color: Colors.textSecondary }}>Theo dõi dự báo để chủ động tưới tiêu và bảo vệ cây trồng.</Text>
        </Animated.View>
        <HourlyForecast data={hourlyData} />
        <WeeklyForecast data={dailyData} />
        <FarmAdvice />
        <SoilMoisture />
        <RainfallChart data={rainForecast} />
      </ScrollView>
    </SafeAreaView>
  );
};
