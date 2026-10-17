import { AppHeader } from "@/components/common/AppHeader";
import { useRouter } from "expo-router";
export const RegisterHeader = () => {
  const router = useRouter();
  return <AppHeader title="Tạo tài khoản" subtitle="Bắt đầu hành trình chăm vườn" onBack={() => router.back()} />;
};
