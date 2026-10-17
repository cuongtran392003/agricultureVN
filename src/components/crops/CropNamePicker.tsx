import { FormModal } from "@/components/common/FormModal";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { Colors } from "@/constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable } from "react-native";
import { CropBrowser } from "./CropBrowser";

export const CropNamePicker = ({ disabled, onSelect }: { disabled: boolean; onSelect: (name: string) => void }) => {
  const [open, setOpen] = useState(false);
  return <>
    <Pressable cssInterop={false} disabled={disabled} accessibilityRole="button" onPress={() => setOpen(true)}
      style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 9, padding: 14, borderRadius: 14, backgroundColor: pressed ? Colors.border : Colors.surfaceMuted, marginBottom: 12 })}>
      <Ionicons name="leaf-outline" size={20} color={Colors.forestgreen} /><Text style={{ color: Colors.forestgreen, fontWeight: "700", fontSize: 13 }}>Chọn từ danh mục cây trồng</Text>
    </Pressable>
    {open ? <FormModal visible title="Chọn cây trồng" subtitle="Tên cây được điền vào công việc; bạn có thể sửa lại." onClose={() => setOpen(false)}>
      <CropBrowser onSelect={crop => { onSelect(crop.name); setOpen(false); }} />
    </FormModal> : null}
  </>;
};
