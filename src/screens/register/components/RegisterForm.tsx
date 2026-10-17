import { FormField } from "@/components/common/FormField";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Colors } from "@/constant/Colors";
import { useRegister } from "@/hooks/useAuth";
import { RegisterFormValue } from "@/types/regiterform";
import { getPasswordErrors, getRegistrationErrors, passwordRequirements } from "@/utils/registerValidation";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

const messages = (message?: string) => message?.split("\n").filter(Boolean);

export const RegisterForm = () => {
  const { control, handleSubmit, watch, setError, clearErrors, formState: { errors } } = useForm<RegisterFormValue>({
    mode: "onBlur", reValidateMode: "onChange",
    defaultValues: { name: "", email: "", password: "" },
  });
  const { mutateAsync: register, isPending } = useRegister();
  const submitting = useRef(false);
  const password = watch("password");
  const clearServerError = (field: keyof RegisterFormValue) => {
    if (errors[field]?.type === "server") clearErrors(field);
    clearErrors("root.server");
  };
  const submit = async (data: RegisterFormValue) => {
    if (submitting.current) return;
    submitting.current = true;
    clearErrors();
    try {
      await register({ name: data.name.trim(), email: data.email.trim(), password: data.password });
    } catch (error: unknown) {
      const validation = getRegistrationErrors(error);
      for (const field of ["name", "email", "password"] as const) {
        if (validation[field]?.length) setError(field, { type: "server", message: validation[field].join("\n") });
      }
      if (validation.form?.length) setError("root.server", { type: "server", message: validation.form.join("\n") });
    } finally {
      submitting.current = false;
    }
  };
  return <View style={{ marginTop: 24 }}>
    {errors.root?.server?.message ? <View style={styles.notice} accessibilityLiveRegion="polite">
      <Text style={styles.noticeTitle}>Không thể đăng ký</Text>
      {messages(errors.root.server.message)?.map((message, index) => <Text key={index} style={styles.noticeText}>{message}</Text>)}
    </View> : null}
    <Controller control={control} name="name" rules={{ validate: value => !!value.trim() || "Vui lòng nhập họ và tên." }} render={({ field }) => (
      <FormField label="Họ và tên" required icon="person-outline" placeholder="Tên của bạn" value={field.value}
        onChangeText={value => { clearServerError("name"); field.onChange(value); }} onBlur={field.onBlur}
        error={messages(errors.name?.message)} editable={!isPending} textContentType="name" />
    )} />
    <Controller control={control} name="email" rules={{ validate: value => !value.trim() ? "Vui lòng nhập email." : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "Email chưa đúng định dạng." }} render={({ field }) => (
      <FormField label="Email" required icon="mail-outline" placeholder="ban@example.com" value={field.value}
        onChangeText={value => { clearServerError("email"); field.onChange(value); }} onBlur={field.onBlur}
        error={messages(errors.email?.message)} editable={!isPending} autoCapitalize="none" autoCorrect={false}
        keyboardType="email-address" textContentType="emailAddress" />
    )} />
    <Controller control={control} name="password" rules={{ validate: value => !value ? "Vui lòng nhập mật khẩu." : getPasswordErrors(value).join("\n") || true }} render={({ field }) => (
      <FormField label="Mật khẩu" required icon="lock-closed-outline" placeholder="Tạo mật khẩu" secureTextEntry value={field.value}
        onChangeText={value => { clearServerError("password"); field.onChange(value); }} onBlur={field.onBlur}
        error={messages(errors.password?.message)} editable={!isPending} autoCapitalize="none" autoCorrect={false}
        textContentType="newPassword" autoComplete="new-password" />
    )} />
    <View style={styles.requirements}>
      <View style={styles.requirementHeader}>
        <Text style={styles.requirementTitle}>Điều kiện mật khẩu</Text>
        <Text localize={false} style={[styles.counter, password.length === 8 && { color: Colors.forestgreen }]}>{password.length}/8</Text>
      </View>
      {passwordRequirements.map(requirement => {
        const fulfilled = requirement.check(password);
        return <View key={requirement.label} style={styles.requirementRow}>
          <Ionicons name={fulfilled ? "checkmark-circle" : "ellipse-outline"} size={18} color={fulfilled ? Colors.leafgreen : Colors.textSecondary} />
          <Text style={[styles.requirementText, fulfilled && { color: Colors.forestgreen }]}>{requirement.label}</Text>
        </View>;
      })}
    </View>
    <PrimaryButton title="Tạo tài khoản" loading={isPending} onPress={handleSubmit(submit)} />
  </View>;
};

const styles = StyleSheet.create({
  notice: { backgroundColor: "#FFF2EF", borderWidth: 1, borderColor: "#E9C6C0", padding: 16, borderRadius: 16, marginBottom: 20 },
  noticeTitle: { color: Colors.error, fontSize: 15, fontWeight: "700", marginBottom: 5 },
  noticeText: { color: Colors.textPrimary, fontSize: 13, lineHeight: 20 },
  requirements: { backgroundColor: Colors.surfaceMuted, borderRadius: 16, padding: 16, marginBottom: 22 },
  requirementHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  requirementTitle: { color: Colors.textPrimary, fontSize: 13, fontWeight: "700" },
  counter: { color: Colors.textSecondary, fontSize: 12, fontWeight: "700" },
  requirementRow: { flexDirection: "row", alignItems: "center", gap: 9, paddingVertical: 4 },
  requirementText: { color: Colors.textSecondary, fontSize: 12, lineHeight: 18, flex: 1 },
});
