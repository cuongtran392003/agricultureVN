import { Colors } from "@/constant/Colors";
import { ScrollView } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView } from "./components/CameraView";
import { DiagnosisHeader } from "./components/DiagnosisHeader";
import { DiagnosisHistory } from "./components/DiagnosisHistory";

export const DiagnosisScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <DiagnosisHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <Animated.View entering={FadeInDown.duration(420)} className="mx-5 mt-5 rounded-[24px] px-5 py-4" style={{ backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border }}>
          <Text className="text-[12px] font-bold tracking-[1.4px]" style={{ color: Colors.leafgreen }}>QUÉT CÂY TRỒNG</Text>
          <Text className="text-[21px] font-bold mt-1" style={{ color: Colors.textPrimary }}>Phát hiện sớm để xử lý kịp thời</Text>
          <Text className="text-[13px] leading-5 mt-2" style={{ color: Colors.textSecondary }}>Đặt lá hoặc bộ phận cây cần kiểm tra vào khung quét để nhận phân tích.</Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(100).duration(420)}>
          <CameraView />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(180).duration(420)}>
          <DiagnosisHistory />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};
