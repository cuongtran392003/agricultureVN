import { Colors } from "@/constant/Colors";
import { ScheduleScreen } from "@/screens/schedule/ScheduleScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Schedule() {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: "transparent" }}>
      <ScheduleScreen />
    </SafeAreaView>
  );
}
