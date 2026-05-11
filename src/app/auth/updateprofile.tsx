import { FormModal } from "@/components/common/FormModal";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { useUpdateUser } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { Text, View } from "react-native";

type ModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function UpdateProfile({ visible, onClose }: ModalProps) {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const { mutateAsync: updateUser } = useUpdateUser();

  const handleUpdate = () => {
    updateUser({ id: user?._id || "", data: { name, email } });
    onClose();
  };

  return (
    <FormModal visible={visible} onClose={onClose} title="Cập nhật thông tin">
      <View className="py-2 mb-4">
        <FormControl className="mb-5">
          <Text className="font-medium text-[14px] text-gray-600 mb-2">
            Họ và tên
          </Text>
          <Input className="h-[56px] rounded-[12px] bg-[#F8FAFC]">
            <InputField
              type="text"
              placeholder="Nhập họ và tên"
              value={name}
              onChangeText={setName}
            />
          </Input>
        </FormControl>

        <FormControl className="mb-5">
          <Text className="font-medium text-[14px] text-gray-600 mb-2">
            Email
          </Text>
          <Input className="h-[56px] rounded-[12px] bg-[#F8FAFC]">
            <InputField
              type="text"
              placeholder="Nhập địa chỉ email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </Input>
        </FormControl>

        <Button
          className="w-full h-[56px] mt-4 bg-[#4CAF50] rounded-[12px]"
          onPress={handleUpdate}
        >
          <ButtonText className="text-white uppercase font-bold text-[16px]">
            Lưu thay đổi
          </ButtonText>
        </Button>
      </View>
    </FormModal>
  );
}
