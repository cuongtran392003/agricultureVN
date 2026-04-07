import { FormModal } from "@/components/common/FormModal";
import { Colors } from "@/constant/Colors";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export const ModalManage = ({
  isModalVisible,
  setIsModalVisible,
  editingId,
  setEditingId,
  name,
  setName,
  description,
  setDescription,
  location,
  setLocation,
  handleSave,
}: {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  editingId: string | null;
  setEditingId: (value: string | null) => void;
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  handleSave: () => void;
}) => {
  return (
    <FormModal
      visible={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      title={editingId ? "Sửa thông tin Nông trại" : "Thêm Nông trại mới"}
    >
      <View className="mb-4">
        <Text className="text-gray-700 font-bold mb-2 text-[15px]">
          Tên nông trại <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-[12px] p-4 text-[16px] text-gray-800"
          placeholder="Ví dụ: Nông trại suối ngàn..."
          value={name}
          onChangeText={setName}
        />
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 font-bold mb-2 text-[15px]">
          Vị trí (Không bắt buộc)
        </Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-[12px] p-4 text-[16px] text-gray-800"
          placeholder="Ví dụ: Thôn 1, Xã A..."
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <View className="mb-6">
        <Text className="text-gray-700 font-bold mb-2 text-[15px]">
          Mô tả thêm (Không bắt buộc)
        </Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-[12px] p-4 text-[16px] text-gray-800"
          placeholder="Ghi chú về nông trại này..."
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
        <Text className="text-white font-bold text-[18px]">
          Lưu thông tin
        </Text>
      </TouchableOpacity>
      
    </FormModal>
  );
};