import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView } from "./components/CameraView";
import { DiagnosisHeader } from "./components/DiagnosisHeader";
import { DiagnosisHistory } from "./components/DiagnosisHistory";

export const DiagnosisScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <DiagnosisHeader />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <CameraView />
        <DiagnosisHistory />
      </ScrollView>
    </SafeAreaView>
  );
};
