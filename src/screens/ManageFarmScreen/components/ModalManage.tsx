import { FormModal } from "@/components/common/FormModal";
import { FormField } from "@/components/common/FormField";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { useState } from "react";
type Props = { isModalVisible: boolean; setIsModalVisible: (value: boolean) => void; editingId: string | null; setEditingId: (value: string | null) => void; name: string; setName: (value: string) => void; description: string; setDescription: (value: string) => void; location: string; setLocation: (value: string) => void; handleSave: () => void | Promise<void> };
export const ModalManage = (props: Props) => {
  const [saving, setSaving] = useState(false);
  const save = async () => { if (saving) return; setSaving(true); try { await props.handleSave(); } finally { setSaving(false); } };
  return <FormModal visible={props.isModalVisible} onClose={() => props.setIsModalVisible(false)} title={props.editingId ? "Cập nhật nông trại" : "Tạo nông trại"}>
    <FormField label="Tên nông trại" icon="home-outline" required placeholder="Ví dụ: Nông trại Suối Ngàn" value={props.name} onChangeText={props.setName} />
    <FormField label="Vị trí" icon="location-outline" placeholder="Địa chỉ hoặc khu vực canh tác" value={props.location} onChangeText={props.setLocation} />
    <FormField label="Mô tả" multiline placeholder="Ghi chú về nông trại…" value={props.description} onChangeText={props.setDescription} />
    <PrimaryButton title="Lưu nông trại" loading={saving} onPress={() => void save()} />
  </FormModal>;
};
