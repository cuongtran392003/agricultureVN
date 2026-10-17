import { Colors } from "@/constant/Colors";
import HomeScreen from "@/screens/home/HomeScreen";
import { View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Home() {
  return (
    <SafeAreaView edges={['top']} style={{backgroundColor: "transparent", flex: 1}}>
      <HomeScreen/>
    </SafeAreaView>
  );
}
