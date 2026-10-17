import { FormField } from "@/components/common/FormField";
import { ManageModal } from "@/components/common/ManageModal";
import { Colors } from "@/constant/Colors";
import {
  useCreatePlot,
  useDeletePlot,
  usePlot,
  useUpdatePlot,
} from "@/hooks/api/plot/usePlot"; // Chú ý kiểm tra lại đường dẫn hook của bạn
import { useAuthStore } from "@/stores/authStore";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";

import { useFarm } from "@/hooks/api/farm/useFarm";
import Animated, { FadeInUp } from "react-native-reanimated";
import { ModalManagePlot } from "./components/ModalManagePlot";

interface Plot {
  _id: string;
  name: string;
  description: string;
  farmId?: any;
}

export const ManagePlotScreen = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const { data: farmRes } = useFarm();
  const { data: plotResponse } = usePlot();
  const { mutateAsync: createPlot } = useCreatePlot();
  const { mutateAsync: updatePlot } = useUpdatePlot();
  const { mutateAsync: deletePlot } = useDeletePlot();
  const { user } = useAuthStore();

  const [plots, setPlots] = useState<Plot[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // States cho Form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [farmId, setFarmId] = useState("");
  const [filterFarmId, setFilterFarmId] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (plotResponse?.data) {
      setPlots(plotResponse.data);
    }
  }, [plotResponse?.data]);

  const openAddForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setFarmId(""); // Reset farmId
    setIsModalVisible(true);
  };

  const openEditForm = (plot: Plot) => {
    setEditingId(plot._id);
    setName(plot.name);
    setDescription(plot.description || "");
    setFarmId(plot.farmId?._id || plot.farmId || "");
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập tên lô đất.");
      return;
    }
    if (!farmId) {
      Alert.alert("Thiếu thông tin", "Vui lòng chọn nông trại quản lý lô đất.");
      return;
    }
    if (!editingId && !user?._id) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập lại trước khi tạo lô đất.");
      return;
    }

    try {
      const plotData = { name: name.trim(), description: description.trim(), farmId };
      if (editingId) {
        await updatePlot({ id: editingId, data: plotData });
      } else {
        await createPlot({ ...plotData, userId: user!._id });
      }
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setIsModalVisible(false);
    } catch {
      Alert.alert("Lỗi", "Không thể lưu lô đất. Vui lòng thử lại.");
    }
  };

  const handleDelete = (id: string, plotName: string) => {
    Alert.alert(
      "Xác nhận xóa",
      `Cô/chú có chắc chắn muốn xóa lô đất "${plotName}" không? Dữ liệu này không thể khôi phục.`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            deletePlot(id);
          },
        },
      ],
    );
  };

  const AddPlotBtn = (
    <TouchableOpacity
      className="flex-row items-center gap-2 rounded-lg px-2 py-1"
      style={{ borderColor: Colors.forestgreen, borderWidth: 1 }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        openAddForm();
      }}
    >
      <FontAwesome name="plus" size={18} color={Colors.forestgreen} />
      <Text className="ml-1 font-bold" style={{ color: Colors.forestgreen }}>
        Thêm
      </Text>
    </TouchableOpacity>
  );

  return (
    <ManageModal
      visible={visible}
      onClose={onClose}
      title="Quản lý Lô đất"
      rightAction={AddPlotBtn}
    >
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-[24px] bg-white p-5 mb-5"><Text className="text-[22px] font-bold mb-4" style={{ color: Colors.textPrimary }}>Lô đất của bạn</Text><FormField label="Tìm lô đất" icon="search-outline" placeholder="Nhập tên lô đất…" value={search} onChangeText={setSearch} />
          <View className="flex-row items-center gap-2 mb-2">
            <FontAwesome
              name="location-arrow"
              size={18}
              color={Colors.forestgreen}
            />
            <Text className="text-gray-600 font-bold text-[15px]">
              Xem lô đất của Nông trại:
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            <TouchableOpacity activeOpacity={1} onPress={() => setFilterFarmId("")} style={{ backgroundColor: !filterFarmId ? Colors.forestgreen : Colors.surfaceMuted, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 14, marginRight: 10 }}><Text style={{ color: !filterFarmId ? "white" : Colors.textPrimary, fontWeight: "700" }}>Tất cả</Text></TouchableOpacity>
            {farmRes?.data?.map((farm: any) => {
              const isSelected = filterFarmId === farm._id;
              return (
                <TouchableOpacity
                  key={farm._id}
                  activeOpacity={1}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setFilterFarmId(farm._id);
                  }}
                  className="rounded-full px-5 py-2.5 mr-3 flex-row items-center"
                  style={{
                    backgroundColor: isSelected
                      ? Colors.leafgreen
                      : Colors.surfaceMuted,
                    borderColor: isSelected
                      ? Colors.leafgreen
                      : Colors.surfaceMuted,
                    borderWidth: 1,
                  }}
                >
                  <Text localize={false}
                    className="font-bold text-[15px]"
                    style={{ color: isSelected ? "white" : Colors.textPrimary }}
                  >
                    {farm.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        {plots?.filter(
          (plot: Plot) => (!filterFarmId || (plot.farmId?._id || plot.farmId) === filterFarmId) && plot.name.toLocaleLowerCase("vi").includes(search.trim().toLocaleLowerCase("vi")),
        ).length === 0 ? (
          <View className="items-center justify-center py-12 mt-4 bg-white rounded-[20px] border border-dashed border-gray-300">
            <FontAwesome5 name="layer-group" size={48} color="#D1D5DB" />
            <Text className="text-center text-gray-800 font-bold mt-4 text-[18px]">
              {search.trim() ? "Không tìm thấy lô đất phù hợp" : "Chưa có lô đất nào"}
            </Text>
            <Text className="text-center text-gray-500 mt-2 text-[15px] px-6">
              {search.trim() ? "Hãy thử tên khác hoặc chọn nông trại khác." : "Bấm nút Thêm ở góc trên để tạo lô đất mới."}
            </Text>
          </View>
        ) : (
          plots
            ?.filter(
              (plot: Plot) =>
                (!filterFarmId || (plot.farmId?._id || plot.farmId) === filterFarmId) && plot.name.toLocaleLowerCase("vi").includes(search.trim().toLocaleLowerCase("vi")),
            )
            .map((plot: Plot, index: number) => (
              <Animated.View
                key={plot._id}
                entering={FadeInUp.delay(index * 100)
                  .springify()
                  .damping(15)}
                className="bg-white rounded-[16px] mb-4 p-4 shadow-sm border border-gray-100"
              >
                <View className="flex-row items-start mb-4">
                  <View className="w-[50px] h-[50px] rounded-full items-center justify-center bg-[#FEF3C7]">
                    <FontAwesome5
                      name="layer-group"
                      size={20}
                      color={Colors.brandorange}
                    />
                  </View>
                  <View className="flex-1 ml-3">
                    <Text localize={false} className="font-bold text-[18px] text-gray-800">
                      {plot.name}
                    </Text>
                    {plot.farmId?.name && (
                      <Text className="text-gray-500 font-medium text-[13px] mt-1">
                        Nông trại: <Text localize={false}>{plot.farmId.name}</Text>
                      </Text>
                    )}

                    {plot.description ? (
                      <Text localize={false}
                        className="text-gray-600 mt-1 text-[14px]"
                        numberOfLines={2}
                      >
                        {plot.description}
                      </Text>
                    ) : null}
                  </View>
                </View>

                <View className="flex-row justify-end border-t border-gray-100 pt-3 gap-3">
                  <TouchableOpacity
                    className="flex-row items-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-200"
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      openEditForm(plot);
                    }}
                  >
                    <Feather name="edit-2" size={16} color="#4B5563" />
                    <Text className="text-gray-700 font-bold ml-2">Sửa</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-row items-center px-4 py-2 bg-[#FEF2F2] rounded-lg border border-[#FECACA]"
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                      handleDelete(plot._id, plot.name);
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

      <ModalManagePlot
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        editingId={editingId}
        setEditingId={setEditingId}
        farmId={farmId}
        setFarmId={setFarmId}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        handleSave={handleSave}
      />
    </ManageModal>
  );
};
