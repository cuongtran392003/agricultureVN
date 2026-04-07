import { Button } from "@/components/ui/button";
import { Colors } from "@/constant/Colors";
import { ManageFarmScreen } from "@/screens/ManageFarmScreen/ManageFarmScreen";
import { ManagePlotScreen } from "@/screens/ManagePlotScreen/ManagePlotScreen";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

export const FloatButton = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalVisibleFarm, setIsModalVisibleFarm] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsOpen(!isOpen);
  };

  const handleNavigate = (path: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsOpen(false);
    router.navigate(path as any);
  };

  const onClose = () => {
    setIsModalVisible(false);
  };

  const onCloseFarm = () => {
    setIsModalVisibleFarm(false);
  };

  return (
    <>
      {isOpen && (
        <Pressable
          style={StyleSheet.absoluteFill}
          className="bg-black/40 z-40"
          onPress={toggleMenu}
        />
      )}

      <View className="absolute bottom-6 right-6 z-50 items-end">
        {isOpen && (
          <View className="items-end mb-4 gap-4 pr-1">
            <Animated.View
              entering={FadeInDown.delay(100)}
              exiting={FadeOutDown}
            >
              <TouchableOpacity
                className="flex-row items-center gap-3"
                onPress={() => handleNavigate("/add-task")}
              >
                <View className="bg-white px-4 py-2 rounded-[12px] shadow-sm">
                  <Text className="font-bold text-gray-700 text-[16px]">
                    Thêm công việc
                  </Text>
                </View>
                <View className="w-[50px] h-[50px] bg-white rounded-full items-center justify-center shadow-md">
                  <MaterialIcons
                    name="add-task"
                    size={24}
                    color={Colors.forestgreen}
                  />
                </View>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(50)}
              exiting={FadeOutDown}
            >
              <TouchableOpacity
                className="flex-row items-center gap-3"
                onPress={() => setIsModalVisible(true)}
              >
                <View className="bg-white px-4 py-2 rounded-[12px] shadow-sm">
                  <Text className="font-bold text-gray-700 text-[16px]">
                    Quản lý lô đất
                  </Text>
                </View>
                <View className="w-[50px] h-[50px] bg-white rounded-full items-center justify-center shadow-md">
                  <MaterialIcons
                    name="landscape"
                    size={24}
                    color={Colors.brandorange}
                  />
                </View>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
              <TouchableOpacity
                className="flex-row items-center gap-3"
                onPress={() => setIsModalVisibleFarm(true)}
              >
                <View className="bg-white px-4 py-2 rounded-[12px] shadow-sm">
                  <Text className="font-bold text-gray-700 text-[16px]">
                    Quản lý nông trại
                  </Text>
                </View>
                <View className="w-[50px] h-[50px] bg-white rounded-full items-center justify-center shadow-md">
                  <MaterialCommunityIcons
                    name="barn"
                    size={24}
                    color="#8B5A2B"
                  />
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}

        <Button
          className="rounded-full w-[60px] h-[60px] items-center justify-center p-0"
          style={{
            backgroundColor: isOpen ? "#EF4444" : Colors.forestgreen,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 8,
          }}
          onPress={toggleMenu}
        >
          <FontAwesome
            className="mx-auto"
            name={isOpen ? "times" : "plus"}
            size={24}
            color="white"
          />
        </Button>
      </View>
      <ManageFarmScreen visibleFarm={isModalVisibleFarm} onCloseFarm={onCloseFarm} />
      <ManagePlotScreen visible={isModalVisible} onClose={onClose} />
    </>
  );
};
