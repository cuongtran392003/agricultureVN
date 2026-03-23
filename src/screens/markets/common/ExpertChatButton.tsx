import { Button } from "@/components/ui/button";
import { Colors } from "@/constant/Colors";
import { ICONS } from "assets/icons";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

export const ExpertChatButton = () => {
  return (
    <Button
      className="flex-row self-end items-center justify-center gap-2 px-3 py-2 rounded-full mt-5 w-[200px] h-[50px]"
      style={{ backgroundColor: Colors.forestgreen }}
      onPress={() => console.log("click")}
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
