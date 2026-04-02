import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useRegister } from "@/hooks/useAuth";
import { RegisterFormValue } from "@/types/regiterform";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValue>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: register, isPending, error, isError } = useRegister();

  const onSubmit = (data: RegisterFormValue) => {
    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
    };
    console.log(">>> check payload", payload);  
    register(payload);
  };
  return (
    <VStack className="w-full mt-4 gap-4">
      <Controller
        control={control}
        name="name"
        rules={{ required: "Không được để trống" }}
        render={({ field: { onChange, value } }) => {
          return (
            <FormControl isInvalid={!!errors.name}>
              <Input
                className="w-full my-1 h-[58px] rounded-[12px] bg-[#F8FAFC]"
                size="lg"
              >
                <InputField
                  value={value}
                  onChangeText={onChange}
                  placeholder="Nhập họ và tên"
                />
              </Input>
              {errors.name && (
                <FormControlError>
                  <FormControlErrorIcon
                    as={AlertCircleIcon}
                    className="text-red-500"
                  />
                  <FormControlErrorText className="text-red-500 text-[10px]">
                    {errors.name.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          );
        }}
      />
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Không được để trống",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email không hợp lệ",
          },
        }}
        render={({ field: { onChange, value } }) => {
          return (
            <FormControl isInvalid={!!errors.email}>
              <Input
                className="w-full my-1 h-[58px] rounded-[12px] bg-[#F8FAFC]"
                size="lg"
              >
                <InputField
                  value={value}
                  onChangeText={onChange}
                  placeholder="Nhập email"
                />
              </Input>
              {errors.email && (
                <FormControlError>
                  <FormControlErrorIcon
                    as={AlertCircleIcon}
                    className="text-red-500"
                  />
                  <FormControlErrorText className="text-red-500 text-[10px]">
                    {errors.email.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          );
        }}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: "Không được để trống" }}
        render={({ field: { onChange, value } }) => {
          return (
            <FormControl isInvalid={!!errors.password}>
              <Input
                className="w-full my-1 h-[58px] rounded-[12px] bg-[#F8FAFC]"
                size="lg"
              >
                <InputField
                  type="password"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Nhập mật khẩu"
                />
              </Input>
              {errors.password && (
                <FormControlError>
                  <FormControlErrorIcon
                    as={AlertCircleIcon}
                    className="text-red-500"
                  />
                  <FormControlErrorText className="text-red-500 text-[10px]">
                    {errors.password.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          );
        }}
      />
      <Button
        className="w-fit h-[56px] mt-4 bg-[#4CAF50] rounded-[12px]"
        size="lg"
        isDisabled={isPending}
        onPress={handleSubmit(onSubmit)}
      >
        <ButtonText className="text-white uppercase w-full text-center font-bold text-[16px]">
          Đăng ký ngay{" "}
        </ButtonText>
      </Button>
    </VStack>
  );
};
