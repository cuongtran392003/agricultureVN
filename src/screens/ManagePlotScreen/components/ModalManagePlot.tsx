import { FormModal } from "@/components/common/FormModal";
import { Colors } from "@/constant/Colors";
import { useFarm } from "@/hooks/api/farm/useFarm";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export const ModalManagePlot = ({
  isModalVisible,
  setIsModalVisible,
  editingId,
  setEditingId,
  farmId,          // Thêm prop farmId
  setFarmId,       // Thêm prop setFarmId
  name,
  setName,
  description,
  setDescription,
  handleSave,
}: {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  editingId: string | null;
  setEditingId: (value: string | null) => void;
  farmId: string;                      // Type cho farmId
  setFarmId: (value: string) => void;  // Type cho setFarmId
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  handleSave: () => void;
}) => {
  const { data: farm } = useFarm();

  return (
    <FormModal
      visible={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      title={editingId ? "Sửa thông tin Lô đất" : "Thêm Lô đất mới"}
    >
      <View className="mb-4">
        <Text className="text-gray-700 font-bold mb-2 text-[15px]">
          Thuộc nông trại <Text className="text-red-500">*</Text>
        </Text>
        <View className="bg-gray-50 border border-gray-200 rounded-[12px] overflow-hidden">
          <Picker
            selectedValue={farmId}
            onValueChange={(itemValue) => setFarmId(itemValue)}
            style={{ height: 50 }}
          >
            <Picker.Item label="Chọn nông trại..." value="" color="gray" />
            {farm?.data?.map((item: any) => (
              <Picker.Item key={item._id} label={item.name} value={item._id} />
            ))}
          </Picker>
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 font-bold mb-2 text-[15px]">
          Tên lô đất <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-[12px] p-4 text-[16px] text-gray-800"
          placeholder="Ví dụ: Lô đất 1..."
          value={name}
          onChangeText={setName}
        />
      </View>

      <View className="mb-6">
        <Text className="text-gray-700 font-bold mb-2 text-[15px]">
          Mô tả thêm (Không bắt buộc)
        </Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-[12px] p-4 text-[16px] text-gray-800"
          placeholder="Ghi chú về lô đất này..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity
        className="w-full py-4 rounded-[12px] items-center justify-center"
        style={{ backgroundColor: Colors.forestgreen }}
        onPress={handleSave}
      >
        <Text className="text-white font-bold text-[18px]">Lưu thông tin</Text>
      </TouchableOpacity>
    </FormModal>
  );
};