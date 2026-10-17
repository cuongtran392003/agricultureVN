import { FormField } from "@/components/common/FormField";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { useLogin } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin();
  const submit = async () => {
    setSubmitted(true);
    if (!email.trim() || password.length < 6 || isPending) return;
    try {
      await login({ email: email.trim(), password });
      router.replace("/(tabs)/home");
    } catch { Alert.alert("Không thể đăng nhập", "Kiểm tra thông tin đăng nhập và kết nối mạng rồi thử lại."); }
  };
  return <View style={{ marginTop: 24 }}>
    <FormField label="Email hoặc số điện thoại" icon="person-outline" value={email} onChangeText={setEmail} placeholder="Nhập tài khoản của bạn" autoCapitalize="none" autoCorrect={false} textContentType="username" required error={submitted && !email.trim() ? "Vui lòng nhập tài khoản." : undefined} />
    <FormField label="Mật khẩu" icon="lock-closed-outline" value={password} onChangeText={setPassword} placeholder="Nhập mật khẩu" secureTextEntry textContentType="password" required error={submitted && password.length < 6 ? "Mật khẩu cần ít nhất 6 ký tự." : undefined} />
    <PrimaryButton title="Đăng nhập" loading={isPending} onPress={() => void submit()} />
  </View>;
};
