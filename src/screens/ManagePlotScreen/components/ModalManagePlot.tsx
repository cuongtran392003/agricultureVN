import { FormModal } from "@/components/common/FormModal";
import { FormField } from "@/components/common/FormField";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Colors } from "@/constant/Colors";
import { useTranslation } from "@/i18n";
import { useFarm } from "@/hooks/api/farm/useFarm";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
type Props = { isModalVisible: boolean; setIsModalVisible: (value: boolean) => void; editingId: string | null; setEditingId: (value: string | null) => void; farmId: string; setFarmId: (value: string) => void; name: string; setName: (value: string) => void; description: string; setDescription: (value: string) => void; handleSave: () => void | Promise<void> };
export const ModalManagePlot = (props: Props) => {
  const { t } = useTranslation();
  const { data: farms } = useFarm();
  const [saving, setSaving] = useState(false);
  const save = async () => { if (saving) return; setSaving(true); try { await props.handleSave(); } finally { setSaving(false); } };
  return <FormModal visible={props.isModalVisible} onClose={() => props.setIsModalVisible(false)} title={props.editingId ? "Cập nhật lô đất" : "Tạo lô đất"}>
    <Text style={{ fontSize: 14, fontWeight: "700", color: Colors.textPrimary, marginBottom: 9 }}>Thuộc nông trại *</Text>
    <View style={{ backgroundColor: Colors.offwhite, borderWidth: 1.5, borderColor: Colors.border, borderRadius: 16, overflow: "hidden", marginBottom: 18 }}><Picker selectedValue={props.farmId} onValueChange={props.setFarmId}><Picker.Item label={t("Chọn nông trại")} value="" />{farms?.data?.map((item: any) => <Picker.Item key={item._id} label={item.name} value={item._id} />)}</Picker></View>
    <FormField label="Tên lô đất" required icon="grid-outline" placeholder="Ví dụ: Lô cà phê số 1" value={props.name} onChangeText={props.setName} />
    <FormField label="Mô tả" multiline placeholder="Đặc điểm hoặc ghi chú về lô đất…" value={props.description} onChangeText={props.setDescription} />
    <PrimaryButton title="Lưu lô đất" loading={saving} onPress={() => void save()} />
  </FormModal>;
};
