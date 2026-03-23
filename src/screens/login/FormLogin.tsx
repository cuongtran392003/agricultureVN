import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useLogin } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const FormLogin = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [inputValueEmail, setInputValueEmail] = useState<string>("");
  const [inputValuePassword, setInputValuePassword] = useState<string>("");
  const router = useRouter()
  const { mutate: login, isPending, isError, error } = useLogin()

  const handleSubmit = () => {
    login({ email: inputValueEmail, password: inputValuePassword })
    if (isError) {
      Alert.alert('Lỗi', error?.message)
    }
    if (!isError) {
      router.replace('/(tabs)/home')
    }
  };
  return (
    <VStack>
      <FormControl
        isInvalid={isInvalid}
        size="lg"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
        className="my-[15px]"
      >
        <Input className="my-1 h-[58px] rounded-[12px] bg-[#F8FAFC]" size="lg">
          <InputField
            type="text"
            placeholder="Nhập SĐT hoặc email của bạn"
            value={inputValueEmail}
            onChangeText={(text) => setInputValueEmail(text)}
          />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
          <FormControlErrorText className="text-red-500 text-[10px]">
            Vui lòng nhập số điện thoại hoặc email hợp lệ.
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl
        isInvalid={isInvalid}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <Input className="my-1 h-[58px] rounded-[12px] bg-[#F8FAFC]" size="lg">
          <InputField
            type="password"
            placeholder="Nhập mật khẩu"
            value={inputValuePassword}
            onChangeText={(text) => setInputValuePassword(text)}
          />
        </Input>
        <FormControlHelper>
          <FormControlHelperText>
            Must be at least 6 characters.
          </FormControlHelperText>
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
          <FormControlErrorText className="text-red-500 text-[10px]">
            At least 6 characters are required.
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      <Button
        className="w-fit h-[56px] mt-4 bg-[#4CAF50] rounded-[12px]"
        size="lg"
        onPress={handleSubmit}
      >
        <ButtonText className="text-white uppercase w-full text-center font-bold text-[16px]">Đăng nhập ngay </ButtonText>
      </Button>
    </VStack>
  );
};
