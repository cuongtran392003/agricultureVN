import { AppHeader } from "@/components/common/AppHeader";
import { QuickTaskTools } from "@/components/tasks/QuickTaskTools";
import { CropNamePicker } from "@/components/crops/CropNamePicker";
import { useTranslation } from "@/i18n";
import { TaskTemplate, useRecentTaskStore } from "@/stores/recentTaskStore";
import { parseVoiceTask } from "@/utils/voiceTask";
import { FormField } from "@/components/common/FormField";
import { FormSection } from "@/components/common/FormSection";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Colors } from "@/constant/Colors";
import { useFarm } from "@/hooks/api/farm/useFarm";
import { usePlot } from "@/hooks/api/plot/usePlot";
import { useCreateTask } from "@/hooks/api/tasks/useTask";
import { useAuthStore } from "@/stores/authStore";
import { formatDate, formatTime } from "@/utils/formatTimeDate";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { SafeAreaView } from "react-native-safe-area-context";

type TaskForm = { title: string; farmId: string; plotId: string; cropName: string; scheduledDate: Date; scheduledTime: Date; priority: string; status: string; description: string; note: string };

export default function AddTaskScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const remember = useRecentTaskStore(state => state.remember);
  const [quickMessage, setQuickMessage] = useState("");
  const { date } = useLocalSearchParams<{ date?: string }>();
  const requestedDate = typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? new Date(`${date}T00:00:00`)
    : null;
  const initialDate = requestedDate && !Number.isNaN(requestedDate.getTime())
    && `${requestedDate.getFullYear()}-${String(requestedDate.getMonth() + 1).padStart(2, "0")}-${String(requestedDate.getDate()).padStart(2, "0")}` === date
    ? requestedDate
    : new Date();
  const { user } = useAuthStore();
  const { data: farms } = useFarm();
  const { data: plots } = usePlot();
  const { mutateAsync: createTask, isPending } = useCreateTask();
  const { control, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm<TaskForm>({ defaultValues: { title: "", farmId: "", plotId: "", cropName: "", scheduledDate: initialDate, scheduledTime: new Date(), priority: "medium", status: "pending", description: "", note: "" } });
  const farmId = watch("farmId");
  const plotId = watch("plotId");
  const [picker, setPicker] = useState<"date" | "time" | null>(null);
  useEffect(() => {
    if (!farmId && farms?.data?.length === 1) setValue("farmId", farms.data[0]._id);
    const available = plots?.data?.filter((plot: any) => (plot.farmId?._id || plot.farmId) === farmId) ?? [];
    if (farmId && !plotId && available.length === 1) setValue("plotId", available[0]._id);
  }, [farmId, plotId, farms?.data, plots?.data, setValue]);
  const applyTemplate = (template: TaskTemplate) => {
    if (isPending) return;
    if (!farms?.data || !plots?.data) { setQuickMessage("Đang tải khu vực. Vui lòng thử lại sau."); return; }
    const validFarm = farms?.data?.some((farm: any) => farm._id === template.farmId);
    const validPlot = validFarm && plots?.data?.some((plot: any) => plot._id === template.plotId && (plot.farmId?._id || plot.farmId) === template.farmId);
    setValue("title", template.title, { shouldDirty: true, shouldValidate: true });
    setValue("farmId", validFarm ? template.farmId : "", { shouldValidate: true });
    setValue("plotId", validPlot ? template.plotId : "", { shouldValidate: true });
    setValue("cropName", template.cropName);
    setValue("description", template.description);
    setValue("note", template.note);
    setValue("priority", ["low", "medium", "high"].includes(template.priority) ? template.priority : "medium");
    setValue("status", "pending");
    setQuickMessage(validFarm && validPlot ? "Đã điền thông tin. Kiểm tra ngày giờ rồi lưu công việc." : "Khu vực cũ không còn khả dụng. Vui lòng chọn lại.");
  };
  const applySpeech = (speech: string) => {
    if (isPending) return;
    const draft = parseVoiceTask(speech, getValues("scheduledDate"), farms?.data ?? [], plots?.data ?? []);
    setValue("title", draft.title, { shouldDirty: true, shouldValidate: true });
    if (draft.scheduledDate) setValue("scheduledDate", draft.scheduledDate);
    if (draft.scheduledTime) setValue("scheduledTime", draft.scheduledTime);
    if (draft.farmId) {
      setValue("farmId", draft.farmId, { shouldValidate: true });
      setValue("plotId", draft.plotId || "", { shouldValidate: true });
    }
    if (draft.priority) setValue("priority", draft.priority);
    setValue("status", "pending");
    setQuickMessage("Đã điền thông tin. Kiểm tra ngày giờ rồi lưu công việc.");
  };
  const submit = async (data: TaskForm) => {
    if (!user?._id) { Alert.alert(t("Vui lòng đăng nhập lại")); return; }
    if (isPending) return;
    const scheduledAt = new Date(data.scheduledDate);
    scheduledAt.setHours(data.scheduledTime.getHours(), data.scheduledTime.getMinutes(), 0, 0);
    // The API accepts ISO timestamps without fractional seconds.
    const scheduledTime = scheduledAt.toISOString().replace(/\.\d{3}Z$/, "Z");
    try {
      await createTask({ ...data, userId: user._id, title: data.title.trim(), scheduledDate: `${data.scheduledDate.getFullYear()}-${String(data.scheduledDate.getMonth() + 1).padStart(2, "0")}-${String(data.scheduledDate.getDate()).padStart(2, "0")}`, scheduledTime });
      remember(user._id, { title: data.title.trim(), farmId: data.farmId, plotId: data.plotId, cropName: data.cropName, description: data.description, note: data.note, priority: data.priority });
      Alert.alert(t("Đã tạo công việc"), t("Kế hoạch mới đã được lưu."), [{ text: t("Xong"), onPress: () => router.back() }]);
    } catch { /* The mutation displays the API error. */ }
  };
  return <SafeAreaView style={{ flex: 1, backgroundColor: Colors.offwhite }}>
    <AppHeader title="Tạo công việc" subtitle="Lên kế hoạch chăm sóc cho vườn" onBack={() => router.back()} />
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
        <QuickTaskTools disabled={isPending} onSpeech={applySpeech} onTemplate={applyTemplate} onTitle={title => { setValue("title", title, { shouldDirty: true, shouldValidate: true }); setValue("status", "pending"); setQuickMessage("Kiểm tra và sửa thông tin trước khi lưu."); }} />
        {quickMessage ? <Text accessibilityLiveRegion="polite" style={{ color: Colors.leafgreen, fontSize: 13, lineHeight: 20, marginBottom: 16 }}>{quickMessage}</Text> : null}
        <FormSection step="1" title="Công việc & khu vực" description="Chọn nơi thực hiện và nội dung cần làm.">
          <Controller control={control} name="title" rules={{ validate: value => !!value.trim() || "Vui lòng nhập tên công việc." }} render={({ field }) => <FormField label="Tên công việc" required icon="clipboard-outline" placeholder="Ví dụ: Bón phân cho cà phê" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} error={errors.title?.message} />} />
          <Text style={label}>Nông trại *</Text>
          <Controller control={control} name="farmId" rules={{ required: "Vui lòng chọn nông trại." }} render={({ field }) => <View style={select}><Picker selectedValue={field.value} onValueChange={value => { field.onChange(value); setValue("plotId", ""); }}><Picker.Item label={t("Chọn nông trại")} value="" />{farms?.data?.map((item: any) => <Picker.Item key={item._id} label={item.name} value={item._id} />)}</Picker></View>} />
          {errors.farmId ? <Text style={error}>{errors.farmId.message}</Text> : null}
          <Text style={label}>Lô đất *</Text>
          <Controller control={control} name="plotId" rules={{ required: "Vui lòng chọn lô đất." }} render={({ field }) => <View style={select}><Picker enabled={!!farmId} selectedValue={field.value} onValueChange={field.onChange}><Picker.Item label={t(farmId ? "Chọn lô đất" : "Chọn nông trại trước")} value="" />{plots?.data?.filter((item: any) => (item.farmId?._id || item.farmId) === farmId).map((item: any) => <Picker.Item key={item._id} label={item.name} value={item._id} />)}</Picker></View>} />
          {errors.plotId ? <Text style={error}>{errors.plotId.message}</Text> : null}
          <Controller control={control} name="cropName" render={({ field }) => <FormField label="Cây trồng" icon="leaf-outline" placeholder="Ví dụ: Cà phê" value={field.value} onChangeText={field.onChange} />} />
          <CropNamePicker disabled={isPending} onSelect={name => setValue("cropName", name, { shouldDirty: true })} />
        </FormSection>
        <FormSection step="2" title="Thời gian & mức ưu tiên" description="Chọn ngày, giờ và trạng thái ban đầu.">
          <View style={{ flexDirection: "row", gap: 12 }}>
            {(["date", "time"] as const).map(mode => <View key={mode} style={{ flex: 1 }}><Text style={label}>{mode === "date" ? "Ngày thực hiện" : "Giờ thực hiện"}</Text><Controller control={control} name={mode === "date" ? "scheduledDate" : "scheduledTime"} render={({ field }) => <><TouchableOpacity onPress={() => setPicker(mode)} style={[select, { padding: 16 }]}><Text style={{ color: Colors.textPrimary, fontWeight: "700" }}>{mode === "date" ? formatDate(field.value) : formatTime(field.value)}</Text></TouchableOpacity>{picker === mode ? <DateTimePicker value={field.value} mode={mode} display="default" onChange={(_, value) => { setPicker(Platform.OS === "ios" ? mode : null); if (value) field.onChange(value); }} /> : null}</>} /></View>)}
          </View>
          {Platform.OS === "ios" && picker ? <TouchableOpacity onPress={() => setPicker(null)} style={{ alignSelf: "flex-end", padding: 12 }}><Text style={{ color: Colors.leafgreen, fontWeight: "700" }}>Xong</Text></TouchableOpacity> : null}
          <Text style={label}>Mức ưu tiên</Text>
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <View style={{ flexDirection: "row", gap: 8 }}>
                {[{ label: "Thấp", value: "low" }, { label: "Trung bình", value: "medium" }, { label: "Cao", value: "high" }].map(item => {
                  const selected = field.value === item.value;
                  return (
                    <Pressable
                      cssInterop={false}
                      key={item.value}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: selected }}
                      onPress={() => field.onChange(item.value)}
                      style={({ pressed }) => ({
                        flex: 1,
                        minWidth: 0,
                        minHeight: 48,
                        paddingVertical: 14,
                        paddingHorizontal: 4,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 14,
                        backgroundColor: selected
                          ? pressed ? Colors.deepbark : Colors.forestgreen
                          : pressed ? Colors.border : Colors.surfaceMuted,
                      })}
                    >
                      <Text style={{ fontSize: 13, fontWeight: "700", textAlign: "center", color: selected ? "white" : Colors.textPrimary }}>{item.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          />
          <Text style={label}>Trạng thái</Text>
          <Controller control={control} name="status" render={({ field }) => <View style={select}><Picker selectedValue={field.value} onValueChange={field.onChange}><Picker.Item label={t("Chờ thực hiện")} value="pending" /><Picker.Item label={t("Hoàn thành")} value="completed" /><Picker.Item label={t("Đã hủy")} value="cancelled" /></Picker></View>} />
        </FormSection>
        <FormSection step="3" title="Thông tin bổ sung" description="Ghi lại hướng dẫn và vật tư cần chuẩn bị.">
          <Controller control={control} name="description" render={({ field }) => <FormField label="Mô tả" multiline placeholder="Các bước thực hiện…" value={field.value} onChangeText={field.onChange} />} />
          <Controller control={control} name="note" render={({ field }) => <FormField label="Ghi chú" multiline placeholder="Vật tư hoặc lưu ý…" value={field.value} onChangeText={field.onChange} />} />
        </FormSection>
        <PrimaryButton title="Lưu công việc" loading={isPending} onPress={handleSubmit(submit)} />
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}
const label = { fontSize: 14, fontWeight: "700" as const, color: Colors.textPrimary, marginBottom: 9, marginTop: 12 };
const select = { backgroundColor: Colors.offwhite, borderWidth: 1.5, borderColor: Colors.border, borderRadius: 16, overflow: "hidden" as const, marginBottom: 10 };
const error = { color: Colors.error, fontSize: 12 };
