import { FormField } from "@/components/common/FormField";
import { FormModal } from "@/components/common/FormModal";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Colors } from "@/constant/Colors";
import { useCropMutations } from "@/hooks/api/crops/useCrops";
import { useTranslation } from "@/i18n";
import { Crop } from "@/types/crops";
import { buildCropInput, cropApiError, regionError } from "@/utils/cropValidation";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";

type Values = { name: string; variety: string; description: string; regions: string[] };
type Props = { crop?: Crop; onClose: () => void; onSaved: (crop: Crop) => void };
const messages = (value?: string) => value?.split("\n").filter(Boolean);

export const CropFormModal = ({ crop, onClose, onSaved }: Props) => {
  const { t } = useTranslation();
  const mutations = useCropMutations();
  const busy = mutations.create.isPending || mutations.update.isPending;
  const saving = useRef(false);
  const [regionDraft, setRegionDraft] = useState("");
  const { control, watch, setValue, setError, clearErrors, handleSubmit, formState: { errors } } = useForm<Values>({
    mode: "onBlur",
    defaultValues: { name: crop?.name ?? "", variety: crop?.variety ?? "", description: crop?.description ?? "", regions: crop?.regions ?? [] },
  });
  const regions = watch("regions");
  const clearServer = (field: keyof Values) => {
    if (errors[field]?.type === "server") clearErrors(field);
    clearErrors("root.server");
  };
  const addRegion = () => {
    const error = regionError(regions, regionDraft);
    if (error) { setError("regions", { message: error }); return; }
    setValue("regions", [...regions, regionDraft.trim()], { shouldDirty: true });
    clearErrors("regions"); setRegionDraft("");
  };
  const submit = async (values: Values) => {
    if (saving.current) return;
    let nextRegions = values.regions;
    if (regionDraft.trim()) {
      const error = regionError(nextRegions, regionDraft);
      if (error) { setError("regions", { message: error }); return; }
      nextRegions = [...nextRegions, regionDraft.trim()];
    }
    const input = buildCropInput({ ...values, regions: nextRegions }, crop);
    if (crop && !Object.keys(input).length) { onClose(); return; }
    saving.current = true;
    clearErrors();
    try {
      const result = crop
        ? await mutations.update.mutateAsync({ id: crop._id, input })
        : await mutations.create.mutateAsync({ ...input, name: values.name.trim() });
      onSaved(result.data);
    } catch (error: unknown) {
      const failure = cropApiError(error);
      const grouped: Partial<Record<keyof Values | "form", string[]>> = {};
      for (const message of failure.messages) {
        let field: keyof typeof grouped = "form";
        if (failure.status === 400) {
          if (/regions|vùng/i.test(message)) field = "regions";
          else if (/variety|giống/i.test(message)) field = "variety";
          else if (/description|mô tả/i.test(message)) field = "description";
          else if (/\bname\b|tên cây/i.test(message)) field = "name";
        }
        (grouped[field] ??= []).push(message);
      }
      for (const field of ["name", "variety", "description", "regions"] as const) {
        if (grouped[field]?.length) setError(field, { type: "server", message: grouped[field].join("\n") });
      }
      if (grouped.form?.length) setError("root.server", { type: "server", message: grouped.form.join("\n") });
    } finally { saving.current = false; }
  };
  return <FormModal visible onClose={() => { if (!saving.current) onClose(); }} title={crop ? "Sửa cây trồng" : "Thêm cây trồng"}>
    {errors.root?.server?.message ? <View style={styles.notice} accessibilityLiveRegion="polite">
      {messages(errors.root.server.message)?.map((message, index) => <Text key={index} style={styles.error}>{message}</Text>)}
    </View> : null}
    <Controller control={control} name="name" rules={{ validate: value => !value.trim() ? "Vui lòng nhập tên cây trồng." : value.trim().length <= 100 || "Tên cây trồng tối đa 100 ký tự." }} render={({ field }) => (
      <FormField label="Tên cây trồng" required icon="leaf-outline" placeholder="Ví dụ: Cà chua" value={field.value} editable={!busy}
        onChangeText={value => { clearServer("name"); field.onChange(value); }} onBlur={field.onBlur} error={messages(errors.name?.message)} />
    )} />
    <Controller control={control} name="variety" rules={{ validate: value => crop?.variety && !value.trim() ? "Giống đã lưu không thể để trống." : value.trim().length <= 100 || "Giống cây tối đa 100 ký tự." }} render={({ field }) => (
      <FormField label="Giống cây" required={!!crop?.variety} icon="flower-outline" placeholder="Giống do bạn lựa chọn" value={field.value} editable={!busy}
        hint={crop?.variety ? "Giống đã lưu không thể để trống." : "Không bắt buộc, tối đa 100 ký tự."}
        onChangeText={value => { clearServer("variety"); field.onChange(value); }} onBlur={field.onBlur} error={messages(errors.variety?.message)} />
    )} />
    <Controller control={control} name="description" rules={{ maxLength: { value: 2000, message: "Mô tả tối đa 2000 ký tự." } }} render={({ field }) => (
      <FormField label="Mô tả" multiline placeholder="Thông tin và ghi chú về cây…" value={field.value} editable={!busy}
        hint="Không bắt buộc, tối đa 2000 ký tự." onChangeText={value => { clearServer("description"); field.onChange(value); }}
        onBlur={field.onBlur} error={messages(errors.description?.message)} />
    )} />
    <View style={styles.regionHeader}><Text style={styles.label}>Vùng trồng</Text><Text localize={false} style={styles.hint}>{regions.length}/20</Text></View>
    <Text style={styles.hint}>Thêm vùng của bạn, tối đa 100 ký tự mỗi vùng.</Text>
    <View style={styles.regionInput}>
      <View style={{ flex: 1 }}><FormField label="Tên vùng" placeholder="Ví dụ: Miền Nam" value={regionDraft} editable={!busy}
        onChangeText={value => { setRegionDraft(value); clearErrors("regions"); clearErrors("root.server"); }} onSubmitEditing={addRegion} returnKeyType="done" /></View>
      <Pressable cssInterop={false} disabled={busy} accessibilityRole="button" accessibilityLabel={t("Thêm vùng")} onPress={addRegion}
        style={({ pressed }) => [styles.add, pressed && { backgroundColor: Colors.deepbark }]}><Ionicons name="add" size={24} color="white" /></Pressable>
    </View>
    {regions.length ? <View style={styles.tags}>{regions.map(region => <Pressable cssInterop={false} key={region} disabled={busy}
      accessibilityRole="button" accessibilityLabel={`${t("Xóa vùng")}: ${region}`} onPress={() => { setValue("regions", regions.filter(item => item !== region), { shouldDirty: true }); clearErrors("regions"); }}
      style={({ pressed }) => [styles.tag, pressed && { backgroundColor: Colors.border }]}><Text localize={false} style={styles.tagText}>{region}</Text><Ionicons name="close" size={17} color={Colors.forestgreen} /></Pressable>)}</View>
      : <Text style={styles.hint}>Chưa chọn vùng. Có thể để trống.</Text>}
    {messages(errors.regions?.message)?.map((message, index) => <Text key={index} style={styles.error}>{message}</Text>)}
    <View style={{ marginTop: 22 }}><PrimaryButton title="Lưu cây trồng" loading={busy} onPress={handleSubmit(submit)} /></View>
  </FormModal>;
};
const styles = StyleSheet.create({
  notice: { padding: 14, borderRadius: 14, backgroundColor: "#FFF2EF", marginBottom: 16 },
  error: { color: Colors.error, fontSize: 12, lineHeight: 19, marginTop: 6 },
  label: { color: Colors.textPrimary, fontSize: 14, fontWeight: "700" },
  hint: { color: Colors.textSecondary, fontSize: 12, lineHeight: 19 },
  regionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  regionInput: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12 },
  add: { backgroundColor: Colors.forestgreen, width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: { flexDirection: "row", gap: 8, alignItems: "center", backgroundColor: Colors.surfaceMuted, padding: 10, borderRadius: 12, maxWidth: "100%" },
  tagText: { color: Colors.forestgreen, fontSize: 13, flexShrink: 1 },
});
