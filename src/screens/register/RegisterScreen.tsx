import { Colors } from "@/constant/Colors";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RegisterHeader } from "./components/RegisterHeader";
import { RegisterImage } from "./components/RegisterImage";
import { RegisterForm } from "./components/RegisterForm";

export const RegisterScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-4 items-center">
      <RegisterHeader />
      <RegisterImage />
      <View className="mt-4">
        <Text className="font-bold text-[24px]">Chào mừng nhà nông</Text>
        <Text className="text-[16px]" style={{ color: Colors.lightgray }}>
          Cung cấp thông tin để bắt đầu hành trình canh tác bền vững cùng chúng
          tôi
        </Text>
      </View>
      <RegisterForm />
    </SafeAreaView>
  );
};
