import { FormModal } from "@/components/common/FormModal";
import { FormField } from "@/components/common/FormField";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { useUpdateUser } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
type Props = { visible: boolean; onClose: () => void };
export default function UpdateProfile({ visible, onClose }: Props) {
  const { user } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync: updateUser, isPending } = useUpdateUser();
  useEffect(() => { if (visible) { setName(user?.name || ""); setEmail(user?.email || ""); setSubmitted(false); } }, [visible, user?.name, user?.email]);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const save = async () => {
    setSubmitted(true);
    if (!user?._id || !name.trim() || !emailValid || isPending) return;
    try { await updateUser({ id: user._id, data: { name: name.trim(), email: email.trim() } }); onClose(); } catch { /* The mutation displays the API error. */ }
  };
  return <FormModal visible={visible} onClose={onClose} title="Chỉnh sửa hồ sơ">
    <FormField label="Họ và tên" required icon="person-outline" value={name} onChangeText={setName} placeholder="Nhập họ và tên" error={submitted && !name.trim() ? "Vui lòng nhập tên." : undefined} />
    <FormField label="Email" required icon="mail-outline" value={email} onChangeText={setEmail} placeholder="ban@example.com" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} error={submitted && !emailValid ? "Email chưa đúng định dạng." : undefined} />
    <PrimaryButton title="Lưu thay đổi" loading={isPending} onPress={() => void save()} />
  </FormModal>;
}
