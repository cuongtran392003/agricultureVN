import { Colors } from "@/constant/Colors";
import HomeScreen from "@/screens/home/HomeScreen";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Home() {
  return (
    <SafeAreaView style={{backgroundColor: Colors.lightgray, flex: 1}}>
      <HomeScreen/>
    </SafeAreaView>
  );
}
