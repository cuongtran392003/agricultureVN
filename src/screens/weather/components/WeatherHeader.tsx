import { AppHeader } from "@/components/common/AppHeader";
import { useRouter } from "expo-router";
export const WeatherHeader = ({ location }: { location?: string }) => {
  const router = useRouter();
  return <AppHeader title="Thời tiết" subtitle={location || "Dự báo quanh bạn"} onBack={() => router.back()} />;
};
