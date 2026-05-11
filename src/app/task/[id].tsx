import { Button, ButtonText } from "@/components/ui/button";
import { Colors } from "@/constant/Colors";
import { useGetTaskById, useUpdateTask } from "@/hooks/api/tasks/useTask";
import {
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailTask() {
  const { id } = useLocalSearchParams();
  const { data: response, isLoading } = useGetTaskById(id as string);

  const task = response?.data;

  const { mutateAsync: updateTask } = useUpdateTask();

  const handleUpdateTask = async () => {
    if (!task || task.status === "completed") return;
    await updateTask({
      id: task._id,
      status: "completed",
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color={Colors.leafgreen} />
      </View>
    );
  }

  if (!task) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500 font-medium">
          Không tìm thấy công việc
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 p-3 bg-[#FEF3C7] rounded-xl"
        >
          <Text
            style={{ color: Colors.brandorange }}
            className="font-bold text-[14px]"
          >
            Quay lại
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Determine status display
  const isCompleted = task.status === "completed";
  const statusColor = isCompleted ? Colors.forestgreen : Colors.brandorange;
  const statusBg = isCompleted ? "#E1EDE6" : "#FEF3C7";
  const statusText = isCompleted ? "Đã hoàn thành" : "Chờ thực hiện";

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View
        className="flex-row items-center justify-between px-5 py-4 bg-white"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full bg-[#F2F7F4]"
        >
          <Ionicons name="chevron-back" size={24} color={Colors.forestgreen} />
        </TouchableOpacity>
        <Text
          className="font-bold text-[18px]"
          style={{ color: Colors.deepbark }}
        >
          Chi tiết công việc
        </Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Card */}
        <View
          className="bg-white p-5 rounded-[20px] shadow-sm mb-5"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 3,
          }}
        >
          <View className="flex-row justify-between items-start mb-3">
            <View className="flex-1 pr-3">
              <Text
                className="text-[22px] font-bold"
                style={{ color: Colors.deepbark }}
              >
                {task.title}
              </Text>
            </View>
            <View
              className="px-3 py-1.5 rounded-full"
              style={{ backgroundColor: statusBg }}
            >
              <Text
                className="text-[12px] font-bold"
                style={{ color: statusColor }}
              >
                {statusText}
              </Text>
            </View>
          </View>

          <Text
            className="text-[15px] leading-6"
            style={{ color: Colors.brownearth }}
          >
            {task.description || "Không có mô tả chi tiết."}
          </Text>
        </View>

        {/* Info Grid */}
        <View className="flex-row justify-between mb-5">
          {/* Date & Time */}
          <View
            className="bg-white flex-1 mr-2 p-4 rounded-[16px] shadow-sm items-center justify-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 5,
              elevation: 2,
            }}
          >
            <View
              className="w-12 h-12 rounded-full mb-2 items-center justify-center"
              style={{ backgroundColor: "#F2F7F4" }}
            >
              <MaterialCommunityIcons
                name="calendar-clock"
                size={24}
                color={Colors.leafgreen}
              />
            </View>
            <Text
              className="font-bold text-[15px]"
              style={{ color: Colors.deepbark }}
            >
              {dayjs(task.scheduledDate).format("DD/MM/YYYY")}
            </Text>
            <Text
              className="text-[13px] mt-1 font-medium"
              style={{ color: Colors.brandorange }}
            >
              {dayjs(task.scheduledTime).format("HH:mm")}
            </Text>
          </View>

          {/* Priority */}
          <View
            className="bg-white flex-1 ml-2 p-4 rounded-[16px] shadow-sm items-center justify-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 5,
              elevation: 2,
            }}
          >
            <View
              className="w-12 h-12 rounded-full mb-2 items-center justify-center"
              style={{ backgroundColor: "#FEF3C7" }}
            >
              <MaterialCommunityIcons
                name="flag-variant"
                size={24}
                color={Colors.brandorange}
              />
            </View>
            <Text
              className="font-bold text-[15px]"
              style={{ color: Colors.deepbark }}
            >
              Mức độ
            </Text>
            <Text
              className="text-[13px] mt-1 font-medium"
              style={{
                color:
                  task.priority === "high"
                    ? Colors.error
                    : task.priority === "medium"
                      ? Colors.warning
                      : Colors.forestgreen,
              }}
            >
              {task.priority === "high"
                ? "Cao"
                : task.priority === "medium"
                  ? "Trung bình"
                  : "Thấp"}
            </Text>
          </View>
        </View>

        {/* Location Info */}
        <View
          className="bg-white p-5 rounded-[20px] shadow-sm mb-5"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 3,
          }}
        >
          <Text
            className="font-bold text-[16px] mb-4"
            style={{ color: Colors.deepbark }}
          >
            Thông tin canh tác
          </Text>

          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full items-center justify-center bg-[#F2F7F4] mr-3">
              <FontAwesome
                name="map-marker"
                size={20}
                color={Colors.leafgreen}
              />
            </View>
            <View>
              <Text
                className="text-[13px]"
                style={{ color: Colors.brownearth }}
              >
                Nông trại
              </Text>
              <Text
                className="font-bold text-[15px]"
                style={{ color: Colors.deepbark }}
              >
                {task.farmId?.name || "Chưa cập nhật"}
              </Text>
            </View>
          </View>

          <View className="h-[1px] w-full bg-gray-100 mb-4" />

          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full items-center justify-center bg-[#F2F7F4] mr-3">
              <MaterialCommunityIcons
                name="image-filter-hdr"
                size={20}
                color={Colors.leafgreen}
              />
            </View>
            <View>
              <Text
                className="text-[13px]"
                style={{ color: Colors.brownearth }}
              >
                Khu đất canh tác
              </Text>
              <Text
                className="font-bold text-[15px]"
                style={{ color: Colors.deepbark }}
              >
                {task.plotId?.name || "Chưa cập nhật"}{" "}
                {task.plotId?.code ? `(${task.plotId.code})` : ""}
              </Text>
            </View>
          </View>
        </View>

        {/* Note Box */}
        {task.note ? (
          <View className="bg-[#FEF9F5] border border-[#FDECDA] p-5 rounded-[20px] mb-8">
            <View className="flex-row items-center mb-3">
              <MaterialCommunityIcons
                name="note-text-outline"
                size={20}
                color={Colors.brandorange}
              />
              <Text
                className="font-bold text-[15px] ml-2"
                style={{ color: Colors.brandorange }}
              >
                Ghi chú công việc
              </Text>
            </View>
            <Text
              className="text-[14px] leading-6"
              style={{ color: Colors.brownearth }}
            >
              {task.note}
            </Text>
          </View>
        ) : null}

        <Button
          className="rounded-lg"
          style={{ backgroundColor: Colors.forestgreen }}
          disabled={isCompleted}
          onPress={handleUpdateTask}
        >
          <ButtonText>{isCompleted ? "Đã xong" : "Đánh dấu xong"}</ButtonText>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
