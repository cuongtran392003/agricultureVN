import { FormField } from "@/components/common/FormField";
import { ManageModal } from "@/components/common/ManageModal";
import { Colors } from "@/constant/Colors";
import { useTranslation } from "@/i18n";
import { isAxiosError } from "axios";
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
import React, { useRef, useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";

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
  const { t } = useTranslation();
  const deleting = useRef(false);
  const { user } = useAuthStore();
  const { data: farmResponse } = useFarm();
  const { mutateAsync: addFarm } = useAddFarm();
  const { mutateAsync: deleteFarm, isPending: isDeleting } = useDeleteFarm();
  const { mutateAsync: updateFarm } = useUpdateFarm();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [search, setSearch] = useState("");
  const visibleFarms = farms.filter(farm => farm.name.toLocaleLowerCase("vi").includes(search.trim().toLocaleLowerCase("vi")));

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

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập tên nông trại.");
      return;
    }

    try {
      const farmData = {
        name: name.trim(),
        description: description.trim(),
        location: location.trim(),
      };

      if (editingId) {
        await updateFarm({ id: editingId, data: farmData });
        Alert.alert("Thành công", "Đã cập nhật thông tin nông trại!");
      } else {
        await addFarm({ ...farmData, userId: user?._id });
        Alert.alert("Thành công", "Đã thêm nông trại mới!");
      }

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setIsModalVisibleFarm(false);
    } catch {
      Alert.alert("Lỗi", "Không thể lưu nông trại. Vui lòng thử lại.");
    }
  };

  const handleDelete = (id: string, farmName: string) => {
    if (deleting.current) return;
    Alert.alert(
      t("Xác nhận xóa"),
      `${t("Bạn có chắc chắn muốn xóa nông trại")} "${farmName}"? ${t("Dữ liệu này không thể khôi phục.")}`,
      [
        { text: t("Hủy"), style: "cancel" },
        {
          text: t("Xóa"),
          style: "destructive",
          onPress: async () => {
            if (deleting.current) return;
            deleting.current = true;
            try {
              await deleteFarm(id);
              setFarms(current => current.filter(farm => farm._id !== id));
              void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
            } catch (error: unknown) {
              const response = isAxiosError(error) ? error.response : undefined;
              const message: unknown = response?.data?.message;
              const serverMessage = typeof message === "string" ? message.trim()
                : Array.isArray(message) ? message.filter((item): item is string => typeof item === "string" && !!item.trim()).join("\n") : "";
              const conflict = response?.status === 409;
              const fallback = conflict ? "Server chưa cho phép xóa nông trại do xung đột dữ liệu." : "Không thể xóa nông trại. Vui lòng thử lại.";
              Alert.alert(t(conflict ? "Chưa thể xóa nông trại" : "Lỗi"),
                `${t(serverMessage || fallback)}${conflict ? `\n\n${t("Kiểm tra các lô đất và công việc liên quan đến nông trại rồi thử lại.")}` : ""}`);
            } finally {
              deleting.current = false;
            }
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
        <View className="rounded-[24px] bg-white p-5 mb-5"><Text className="text-[22px] font-bold" style={{ color: Colors.textPrimary }}>Khu vực canh tác</Text><Text className="mt-2 mb-4" style={{ color: Colors.textSecondary }}>{farms.length} nông trại đang quản lý</Text><FormField label="Tìm nông trại" icon="search-outline" placeholder="Nhập tên nông trại…" value={search} onChangeText={setSearch} /></View>
        {visibleFarms.length === 0 ? (
          <Text className="text-center text-gray-500 mt-10 text-[16px]">
            {search.trim() ? "Không tìm thấy nông trại phù hợp. Hãy thử tên khác." : "Chưa có nông trại nào. Hãy thêm mới nhé!"}
          </Text>
        ) : (
          visibleFarms.map((farm: Farm) => (
            <View
              key={farm._id}
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
                  <Text localize={false} className="font-bold text-[18px] text-gray-800">
                    {farm.name}
                  </Text>
                  {farm.location ? (
                    <View className="flex-row items-center mt-1">
                      <Ionicons
                        name="location-outline"
                        size={14}
                        color="gray"
                      />
                      <Text localize={false} className="text-gray-500 ml-1 text-[13px]">
                        {farm.location}
                      </Text>
                    </View>
                  ) : null}
                  {farm.description ? (
                    <Text localize={false}
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
                  disabled={isDeleting}
                  accessibilityState={{ disabled: isDeleting }}
                  onPress={() => {
                    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
                    handleDelete(farm._id, farm.name);
                  }}
                >
                  <Feather name="trash-2" size={16} color="#EF4444" />
                  <Text className="text-red-500 font-bold ml-2">Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
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
