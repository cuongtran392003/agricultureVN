import { ICONS } from "@/assets/icons";
import { FormLogin } from "@/components/login/FormLogin";
import { Button, ButtonText } from "@/components/ui/button";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";

export default function Index() {
  return (
    <Redirect href="/(auth)/login" />
  );
}
