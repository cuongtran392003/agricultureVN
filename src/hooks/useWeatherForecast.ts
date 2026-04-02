import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";
import { getForecastService } from "@/services/service.weather";
import dayjs from "dayjs";
import "dayjs/locale/vi";

dayjs.locale("vi");

export interface HourlyData {
  time: string;
  temp: string;
  icon: string;
}

export interface DailyData {
  day: string;
  icon: string;
  description: string;
  high: string;
  low: string;
}

export const useWeatherForecast = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const location = await Location.getLastKnownPositionAsync({});
      if (location) {
        setCoords({
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        });
      }
    };
    getLocation();
  }, []);

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["forecast", coords],
    queryFn: () => getForecastService(coords!.lat, coords!.lon),
    enabled: !!coords,
    staleTime: 10 * 60 * 1000,
  });

  // Parse hourly data (next 8 entries = 24 hours)
  const hourlyData: HourlyData[] = data?.list
    ?.slice(0, 8)
    .map((item: any, index: number) => ({
      time: index === 0 ? "Bây giờ" : dayjs(item.dt_txt).format("HH:mm"),
      temp: `${Math.round(item.main.temp)}°`,
      icon: item.weather[0].icon,
    })) ?? [];

  // Parse daily data - group by date, get min/max
  const dailyData: DailyData[] = (() => {
    if (!data?.list) return [];

    const grouped: Record<string, any[]> = {};
    data.list.forEach((item: any) => {
      const dateKey = dayjs(item.dt_txt).format("YYYY-MM-DD");
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(item);
    });

    const today = dayjs().format("YYYY-MM-DD");

    return Object.entries(grouped).map(([dateKey, items]) => {
      const temps = items.map((i: any) => i.main.temp);
      const high = Math.round(Math.max(...temps));
      const low = Math.round(Math.min(...temps));

      // Pick icon from midday entry or first available
      const middayItem =
        items.find((i: any) => dayjs(i.dt_txt).hour() === 12) || items[0];

      const isToday = dateKey === today;
      const dayLabel = isToday
        ? "H.Nay"
        : dayjs(dateKey).format("ddd").replace(/^\w/, (c) => c.toUpperCase());

      return {
        day: dayLabel,
        icon: middayItem.weather[0].icon,
        description: middayItem.weather[0].description,
        high: `${high}°`,
        low: `${low}°`,
      };
    });
  })();

  return { hourlyData, dailyData, isLoading, refetch, isRefetching };
};
