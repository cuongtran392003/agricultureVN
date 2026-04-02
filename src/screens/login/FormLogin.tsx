import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Colors } from "@/constant/Colors";
import { useLogin } from "@/hooks/useAuth";
import { mapAuthError } from "@/utils/authErrorMap";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const FormLogin = () => {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [inputValueEmail, setInputValueEmail] = useState<string>("");
  const [inputValuePassword, setInputValuePassword] = useState<string>("");
  const [showPassword, setShowPassWord] = useState<boolean>(false);
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin();

  const handleSubmit = async () => {
    const email = inputValueEmail.trim();
    const password = inputValuePassword.trim();
    try {
      if (!email && !password) {
        setEmailError(true);
        setPasswordError(true);
        Alert.alert("Lỗi", "Vui lòng nhập email hoặc số điện thoại");
        return;
      }
      if (password.length < 6) {
        setPasswordError(true);
        Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
        return;
      }
      setEmailError(false);
      setPasswordError(false);
      await login({ email, password });
      router.replace("/(tabs)/home");
    } catch (error: any) {
      const message = mapAuthError(error.message);
      Alert.alert("Lỗi", message);
      setEmailError(true);
      setPasswordError(true);
    }
  };
  return (
    <VStack>
      <FormControl
        isInvalid={emailError}
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
        isInvalid={passwordError}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <Input className="my-1 flex-row items-center justify-between pr-2 h-[58px] rounded-[12px] bg-[#F8FAFC]" size="lg">
          <InputField
            type={showPassword ? "text" : "password"}
            placeholder="Nhập mật khẩu"
            value={inputValuePassword}
            onChangeText={(text) => setInputValuePassword(text)}
          />
          <Button
            variant="link"
            size="sm"
            onPress={() => setShowPassWord(!showPassword)}
          >
            {showPassword ? (
              <FontAwesome name="eye" size={24} color={Colors.forestgreen} />
            ) : (
              <FontAwesome name="eye-slash" size={24} color={Colors.forestgreen} />
            )}
          </Button>
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
        <ButtonText className="text-white uppercase w-full text-center font-bold text-[16px]">
          Đăng nhập ngay{" "}
        </ButtonText>
      </Button>
    </VStack>
  );
};
