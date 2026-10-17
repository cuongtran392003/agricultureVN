import { AppHeader } from "@/components/common/AppHeader";
import { useRouter } from "expo-router";
export const ChatHeader = () => {
  const router = useRouter();
  return <AppHeader title="Trợ lý canh tác" subtitle="Hỏi đáp về kỹ thuật và mùa vụ" onBack={() => router.back()} />;
};
