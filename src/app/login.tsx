import { Button, ButtonText } from "@/components/ui/button";
import { FormLogin } from "@/screens/login/FormLogin";
import { ICONS } from "assets/icons";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="relative">
        <View
          className="w-[85px] h-[90px] bg-white rounded-full border border-green-500
            absolute left-44 top-[67px] z-10 
            "
        >
          <Image source={ICONS.iconLogin} className="mx-auto mt-5" />
        </View>
        <View className="opacity-50">
          <Image
            source={require("../../assets/images/image-login.png")}
            style={{ width: "100%", resizeMode: "cover" }}
          />
        </View>
        <View className="w-full h-[52px] absolute top-[170px] z-10">
          <Text className="text-[#0F172A] text-[30px] font-bold text-center">
            Nông nghiệp Việt
          </Text>
          <Text className="text-[#64748B] text-[16px] text-center">
            Đồng hành cùng nhà nông
          </Text>
        </View>
      </View>
      <View className="flex-1 mt-2">
        <View className="w-full py-[15px] px-[32px]">
          <Text className="text-black font-bold text-[20px]">
            Đăng nhập tài khoản
          </Text>
          <FormLogin />
          <Text className="text-center text-black my-5">
            Chưa có tài khoản?
          </Text>
          <Button
            onPress={() => router.navigate("/register")}
            size="lg"
            className="w-full h-[56px] mx-auto bg-white border-[1px] border-[#4CAF50] rounded-[12px]"
          >
            <ButtonText className="text-[#4CAF50] uppercase font-bold">
              Đăng ký tài khoản mới
            </ButtonText>
          </Button>
        </View>
        <Text className="text-center">Phát triển bởi nông nghiệp Việt</Text>
      </View>
    </SafeAreaView>
  );
}
