import { Colors } from "@/constant/Colors";
import { useFarm } from "@/hooks/api/farm/useFarm";
import { usePlot } from "@/hooks/api/plot/usePlot";
import { useCreateTask } from "@/hooks/api/tasks/useTask";
import { useAuthStore } from "@/stores/authStore";
import { CreateTaskDto } from "@/types/tasks";
import { formatDate, formatTime } from "@/utils/formatTimeDate";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type TaskFormValue = {
  userId: string;
  farmId: string;
  plotId: string;
  title: string;
  description: string;
  cropName: string;
  scheduledDate: Date;
  scheduledTime: Date;
  status: string;
  priority: string;
  imageUrl: string;
  note: string;
};

export default function AddTaskScreen() {
  const router = useRouter();

  // react-hook-form implementation
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TaskFormValue>({
    defaultValues: {
      farmId: "",
      plotId: "",
      title: "",
      description: "",
      cropName: "",
      scheduledDate: new Date(),
      scheduledTime: new Date(),
      status: "pending",
      priority: "medium",
      imageUrl: "",
      note: "",
    },
  });
  const priorities = [
    { label: "Thấp", value: "low", color: Colors.lightgray },
    { label: "Trung bình", value: "medium", color: Colors.brandorange },
    { label: "Cao", value: "high", color: "#EF4444" },
  ];

  const statuses = [
    { label: "Chờ thực hiện", value: "pending" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Hủy", value: "cancelled" },
  ];

  const selectedFarmId = watch("farmId");

  React.useEffect(() => {
    setValue("plotId", "");
  }, [selectedFarmId, setValue]);

  const { data: dataPlot } = usePlot();
  const { data: dataFarm } = useFarm();
  const { user } = useAuthStore();
  const [show, setShow] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const { mutateAsync: createTask } = useCreateTask();

  const onSubmit = async (data: TaskFormValue) => {
    try {
      const userId = user?._id;
      if (!userId) {
        Alert.alert("Lỗi", "Vui lòng đăng nhập");
        return;
      }

      const { imageUrl, ...restData } = data;

      const formattedData: CreateTaskDto = {
        ...restData,
        userId: userId,
        scheduledDate: data.scheduledDate.toISOString(),
        scheduledTime: data.scheduledTime.toISOString(),
      };
      await createTask(formattedData);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Thành công", "Thêm công việc thành công", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.log("check error create task", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      {/* Header */}
      <View
        className="flex-row items-center px-[20px] py-[16px] bg-white rounded-b-[24px]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="chevron-back" size={28} color={Colors.forestgreen} />
        </TouchableOpacity>
        <Text
          className="font-bold text-[20px] ml-2"
          style={{ color: Colors.forestgreen }}
        >
          Thêm Công Việc Mới
        </Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            entering={FadeInUp.delay(100).springify()}
            className="gap-5"
          >
            {/* Title */}
            <View>
              <Text className="font-bold mb-2">
                Tên công việc <Text className="text-red-500">*</Text>
              </Text>
              <Controller
                control={control}
                name="title"
                rules={{ required: "Vui lòng nhập tên công việc" }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="VD: Thu hoạch cà chua..."
                    className={`bg-white px-4 py-3 rounded-xl border ${errors.title ? "border-red-500" : "border-gray-100"}`}
                  />
                )}
              />
              {errors.title && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </Text>
              )}
            </View>

            {/* Farm & Plot Selection (Mock UI) */}
            <View className="flex-row gap-4 justify-between">
              <View className="flex-1">
                <Text className="font-bold mb-2">
                  Nông trại <Text className="text-red-500">*</Text>
                </Text>
                <Controller
                  control={control}
                  name="farmId"
                  rules={{ required: "Vui lòng chọn nông trại" }}
                  render={({ field: { onChange, value } }) => (
                    <View className={`bg-white rounded-xl border ${errors.farmId ? "border-red-500" : "border-gray-100"}`}>
                      <Picker selectedValue={value} onValueChange={onChange}>
                        <Picker.Item label="Chọn nông trại" value="" />
                        {dataFarm?.data?.map((item: any) => {
                          return (
                            <Picker.Item
                              key={item._id}
                              label={item.name}
                              value={item._id}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                  )}
                />
                {errors.farmId && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.farmId.message}
                  </Text>
                )}
              </View>
              <View className="flex-1">
                <Text className="font-bold mb-2">
                  Lô đất <Text className="text-red-500">*</Text>
                </Text>
                <Controller
                  control={control}
                  name="plotId"
                  rules={{ required: "Vui lòng chọn lô đất" }}
                  render={({ field: { onChange, value } }) => (
                    <View className={`bg-white rounded-xl border ${errors.plotId ? "border-red-500" : "border-gray-100"}`}>
                      <Picker selectedValue={value} onValueChange={onChange}>
                        <Picker.Item label="Chọn lô đất" value={""} />
                        {dataPlot?.data
                          ?.filter(
                            (plot: any) =>
                              plot.farmId === selectedFarmId ||
                              plot.farmId?._id === selectedFarmId,
                          )
                          .map((item: any) => {
                            return (
                              <Picker.Item
                                key={item._id}
                                label={item.name}
                                value={item._id}
                              />
                            );
                          })}
                      </Picker>
                    </View>
                  )}
                />
                {errors.plotId && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.plotId.message}
                  </Text>
                )}
              </View>
            </View>

            {/* Crop Name */}
            <View>
              <Text className="font-bold mb-2">Cây trồng</Text>
              <Controller
                control={control}
                name="cropName"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Nhập tên cây trồng"
                    className="bg-white px-4 py-3 rounded-xl border border-gray-100"
                  />
                )}
              />
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(200).springify()}
            className="gap-5 mt-5"
          >
            {/* Date & Time */}
            <View className="flex-row gap-4">
              <View className="flex-1">
                <Text className="font-bold mb-2">Ngày thực hiện</Text>
                <Controller
                  control={control}
                  name="scheduledDate"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <TouchableOpacity
                        onPress={() => setShow(true)}
                        className="bg-white px-4 py-3 rounded-xl border border-gray-100 flex-row items-center gap-2"
                      >
                        <FontAwesome
                          name="calendar"
                          size={16}
                          color={Colors.forestgreen}
                        />
                        <Text>{formatDate(value)}</Text>
                      </TouchableOpacity>
                      {show && (
                        <DateTimePicker
                          value={value}
                          mode="date"
                          display="default"
                          onChange={(_event, selectedDate) => {
                            setShow(Platform.OS === "ios");
                            if (selectedDate) onChange(selectedDate);
                          }}
                        />
                      )}
                    </>
                  )}
                />
              </View>
              <View className="flex-1">
                <Text className="font-bold mb-2">Giờ</Text>
                <Controller
                  control={control}
                  name="scheduledTime"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <TouchableOpacity
                        onPress={() => setShowTime(true)}
                        className="bg-white px-4 py-3 rounded-xl border border-gray-100 flex-row items-center gap-2"
                      >
                        <FontAwesome
                          name="clock-o"
                          size={18}
                          color={Colors.forestgreen}
                        />
                        <Text>{formatTime(value)}</Text>
                      </TouchableOpacity>
                      {showTime && (
                        <DateTimePicker
                          value={value}
                          mode="time"
                          display="default"
                          onChange={(_event, selectedDate) => {
                            setShowTime(Platform.OS === "ios");
                            if (selectedDate) onChange(selectedDate);
                          }}
                        />
                      )}
                    </>
                  )}
                />
              </View>
            </View>

            {/* Priority */}
            <View>
              <Text className="font-bold mb-2">Độ ưu tiên</Text>
              <Controller
                control={control}
                name="priority"
                render={({ field: { onChange, value } }) => (
                  <View className="flex-row gap-2">
                    {priorities.map((p) => {
                      const isActive = value === p.value;
                      return (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          key={p.value}
                          onPress={() => {
                            Haptics.impactAsync(
                              Haptics.ImpactFeedbackStyle.Light,
                            );
                            onChange(p.value);
                          }}
                          className="flex-1 py-3 rounded-xl items-center border"
                          style={{
                            backgroundColor: isActive ? p.color : "white",
                            borderColor: isActive ? p.color : "#F3F4F6",
                          }}
                        >
                          <Text
                            style={{
                              color: isActive ? "white" : "gray",
                              fontWeight: isActive ? "bold" : "normal",
                            }}
                          >
                            {p.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              />
            </View>

            {/* Status */}
            <View>
              <Text className="font-bold mb-2">Trạng thái ban đầu</Text>
              <Controller
                control={control}
                name="status"
                render={({ field: { onChange, value } }) => (
                  <View className="flex-row gap-2">
                    {statuses.map((s) => {
                      const isActive = value === s.value;
                      return (
                        <TouchableOpacity
                          activeOpacity={0.9}
                          key={s.value}
                          onPress={() => onChange(s.value)}
                          className="px-4 py-2 rounded-full border border-gray-200"
                          style={{
                            backgroundColor: isActive
                              ? Colors.forestgreen
                              : "white",
                          }}
                        >
                          <Text
                            style={{
                              color: isActive ? "white" : "gray",
                              fontWeight: isActive ? "bold" : "normal",
                            }}
                          >
                            {s.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              />
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(300).springify()}
            className="gap-5 mt-5"
          >
            {/* Description */}
            <View>
              <Text className="font-bold mb-2">Mô tả công việc</Text>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Nhập mô tả cụ thể..."
                    multiline
                    numberOfLines={3}
                    className="bg-white px-4 py-3 rounded-xl border border-gray-100 h-24"
                    textAlignVertical="top"
                  />
                )}
              />
            </View>

            {/* Note */}
            <View>
              <Text className="font-bold mb-2">Ghi chú thêm (Note)</Text>
              <Controller
                control={control}
                name="note"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Ví dụ: cần chuẩn bị 2 túi phân bón..."
                    className="bg-white px-4 py-3 rounded-xl border border-gray-100"
                  />
                )}
              />
            </View>

            {/* Image Placeholder */}
            <View>
              <Text className="font-bold mb-2">
                Hình ảnh đính kèm (Tuỳ chọn)
              </Text>
              <TouchableOpacity className="bg-white h-[100px] rounded-xl border border-dashed border-gray-300 items-center justify-center">
                <FontAwesome name="image" size={24} color="gray" />
                <Text className="text-gray-500 mt-2">
                  Nhấn để tải lên hình ảnh
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Submit Button */}
          <Animated.View
            entering={FadeInUp.delay(400).springify()}
            className="mt-8"
          >
            <TouchableOpacity
              className="py-4 items-center rounded-2xl"
              style={{
                backgroundColor: Colors.forestgreen,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 5,
              }}
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-white font-bold text-[16px]">
                Tạo Công Việc
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
