import { AppHeader } from "@/components/common/AppHeader";
import { useAuthStore } from "@/stores/authStore";
export const HomeHeader = ({ data }: { data: any }) => {
  const { user } = useAuthStore();
  return <AppHeader title={`Xin chào, ${user?.name?.trim().split(" ").pop() || "bạn"}`} subtitle={data?.name || "Chăm sóc mùa vụ mỗi ngày"} icon="leaf-outline" />;
};
