import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";
import { getWeatherService } from "@/services/service.weather";

export const useWeather = () => {
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

  const {data, isLoading, refetch, isRefetching} = useQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeatherService(coords!.lat, coords!.lon),
    enabled: !!coords,
    staleTime: 10 * 60 * 1000,
  })

  return {data, isLoading, refetch, isRefetching}

}