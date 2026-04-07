import { ManageModal } from "@/components/common/ManageModal";
import { Colors } from "@/constant/Colors";
import {
  useAddFarm,
  useDeleteFarm,
  useFarm,
  useUpdateFarm,
} from "@/hooks/api/farm/useFarm";
import { useAuthStore } from "@/stores/authStore";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { ModalManage } from "./components/ModalManage";

// Mô phỏng interface dựa trên DTO của bạn
interface Farm {
  _id: string;
  userId?: string;
  name: string;
  description?: string;
  location?: string;
}

type ManageFarmScreenProp = {
  visibleFarm: boolean;
  onCloseFarm: () => void;
};

export const ManageFarmScreen = ({ visibleFarm, onCloseFarm }: ManageFarmScreenProp) => {
  const { user } = useAuthStore();
  console.log(">>> check user", user);
  const { data: farmResponse } = useFarm();
  const { mutateAsync: addFarm } = useAddFarm();
  const { mutateAsync: deleteFarm } = useDeleteFarm();
  const { mutateAsync: updateFarm } = useUpdateFarm();
  const [farms, setFarms] = useState<Farm[]>([]);

  React.useEffect(() => {
    if (farmResponse?.data) {
      setFarms(farmResponse.data);
    }
  }, [farmResponse?.data]);

  const [isModalVisibleFarm, setIsModalVisibleFarm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const openAddForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setLocation("");
    setIsModalVisibleFarm(true);
  };

  const openEditForm = (farm: Farm) => {
    setEditingId(farm._id);
    setName(farm.name);
    setDescription(farm.description || "");
    setLocation(farm.location || "");
    setIsModalVisibleFarm(true);
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Thiếu thông tin", "Cô/chú vui lòng nhập tên nông trại nhé!");
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    if (editingId) {
      setFarms((prev) =>
        prev.map((f) =>
          f._id === editingId ? { ...f, name, description, location } : f,
        ),
      );
      updateFarm({
        id: editingId,
        data: {
          name,
          description,
          location,
        },
      });
      Alert.alert("Thành công", "Đã cập nhật thông tin nông trại!");
    } else {
      const newFarm: Farm = {
        _id: Math.random().toString(),
        userId: user?._id,
        name,
        description,
        location,
      };
      addFarm(newFarm);
      Alert.alert("Thành công", "Đã thêm nông trại mới!");
    }

    setIsModalVisibleFarm(false);
  };

  const handleDelete = (id: string, farmName: string) => {
    Alert.alert(
      "Xác nhận xóa",
      `Cô/chú có chắc chắn muốn xóa nông trại "${farmName}" không? Dữ liệu này không thể khôi phục.`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            deleteFarm(id);
          },
        },
      ],
    );
  };

  const AddButton = (
    <TouchableOpacity
      className="flex-row items-center gap-2 rounded-lg px-2 py-1"
      style={{ borderColor: Colors.forestgreen, borderWidth: 1 }}
      onPress={openAddForm}
    >
      <FontAwesome name="plus" size={18} color={Colors.forestgreen} />
      <Text className="ml-1 font-bold" style={{ color: Colors.forestgreen }}>
        Thêm
      </Text>
    </TouchableOpacity>
  );

  return (
    <ManageModal
      visible={visibleFarm}
      onClose={onCloseFarm}
      title="Quản lý nông trại"
      rightAction={AddButton}
    >
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {farms.length === 0 ? (
          <Text className="text-center text-gray-500 mt-10 text-[16px]">
            Chưa có nông trại nào. Hãy thêm mới nhé!
          </Text>
        ) : (
          farms.map((farm: Farm, index: number) => (
            <Animated.View
              key={farm._id}
              entering={FadeInUp.delay(index * 100)
                .springify()
                .damping(15)}
              className="bg-white rounded-[16px] mb-4 p-4 shadow-sm border border-gray-100"
            >
              <View className="flex-row items-start mb-4">
                <View className="w-[50px] h-[50px] rounded-full items-center justify-center bg-[#FEF3C7]">
                  <FontAwesome5
                    name="tractor"
                    size={20}
                    color={Colors.brandorange}
                  />
                </View>
                <View className="flex-1 ml-3">
                  <Text className="font-bold text-[18px] text-gray-800">
                    {farm.name}
                  </Text>
                  {farm.location ? (
                    <View className="flex-row items-center mt-1">
                      <Ionicons
                        name="location-outline"
                        size={14}
                        color="gray"
                      />
                      <Text className="text-gray-500 ml-1 text-[13px]">
                        {farm.location}
                      </Text>
                    </View>
                  ) : null}
                  {farm.description ? (
                    <Text
                      className="text-gray-600 mt-1 text-[14px]"
                      numberOfLines={2}
                    >
                      {farm.description}
                    </Text>
                  ) : null}
                </View>
              </View>

              {/* ACTION BUTTONS (Sửa / Xóa) */}
              <View className="flex-row justify-end border-t border-gray-100 pt-3 gap-3">
                <TouchableOpacity
                  className="flex-row items-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-200"
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    openEditForm(farm);
                  }}
                >
                  <Feather name="edit-2" size={16} color="#4B5563" />
                  <Text className="text-gray-700 font-bold ml-2">Sửa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center px-4 py-2 bg-[#FEF2F2] rounded-lg border border-[#FECACA]"
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    handleDelete(farm._id, farm.name);
                  }}
                >
                  <Feather name="trash-2" size={16} color="#EF4444" />
                  <Text className="text-red-500 font-bold ml-2">Xóa</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          ))
        )}
      </ScrollView>
      <ModalManage
        isModalVisible={isModalVisibleFarm}
        setIsModalVisible={setIsModalVisibleFarm}
        editingId={editingId}
        setEditingId={setEditingId}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        location={location}
        setLocation={setLocation}
        handleSave={handleSave}
      />
    </ManageModal>
  );
};
