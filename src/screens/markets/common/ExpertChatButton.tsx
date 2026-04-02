import { Button } from "@/components/ui/button";
import { Colors } from "@/constant/Colors";
import { ICONS } from "assets/icons";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

export const ExpertChatButton = () => {
  const router = useRouter()
  return (
    <Button
      className="flex-row items-center justify-center gap-2 px-3 py-2 rounded-full mt-2 self-center w-[200px] h-[50px] mb-6"
      style={{
        backgroundColor: Colors.forestgreen,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      }}
      onPress={() => router.navigate("/chat" as any)}
    >
      <View
        style={{
          width: 20,
          height: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={ICONS.iconChat} />
      </View>
      <Text className="font-bold" style={{ color: Colors.sunlightyellow }}>
        Hỏi chuyên gia
      </Text>
    </Button>
  );
};
