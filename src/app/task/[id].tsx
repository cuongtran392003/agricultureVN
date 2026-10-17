import { AppHeader } from "@/components/common/AppHeader";
import { FormSection } from "@/components/common/FormSection";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Colors } from "@/constant/Colors";
import { useGetTaskById, useUpdateTask } from "@/hooks/api/tasks/useTask";
import dayjs from "dayjs";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { SafeAreaView } from "react-native-safe-area-context";
export default function DetailTask() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: response, isLoading, isError, refetch } = useGetTaskById(id);
  const task = response?.data;
  const { mutateAsync: updateTask, isPending } = useUpdateTask();
  const done = task?.status === "completed";
  const cancelled = task?.status === "cancelled";
  const markDone = async () => { if (!task || done || isPending) return; try { await updateTask({ id: task._id, status: "completed" }); } catch { /* The mutation displays the API error. */ } };
  return <SafeAreaView style={{ flex: 1, backgroundColor: Colors.offwhite }}>
    <AppHeader title="Chi tiết công việc" subtitle="Theo dõi kế hoạch và tiến độ" onBack={() => router.back()} />
    {isLoading ? <ActivityIndicator style={{ marginTop: 50 }} color={Colors.leafgreen} /> : !task ? <View style={{ padding: 24, gap: 20 }}><Text style={{ color: Colors.textSecondary }}>{isError ? "Chưa tải được công việc." : "Không tìm thấy công việc."}</Text><PrimaryButton title="Thử tải lại" onPress={() => void refetch()} /></View> : <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
      <View style={{ backgroundColor: Colors.forestgreen, padding: 24, borderRadius: 26, marginBottom: 20 }}>
        <Text style={{ color: Colors.sunlightyellow, fontSize: 12, fontWeight: "700" }}>{done ? "ĐÃ HOÀN THÀNH" : cancelled ? "ĐÃ HỦY" : "CHỜ THỰC HIỆN"}</Text>
        <Text localize={false} style={{ color: "white", fontSize: 28, fontWeight: "800", marginTop: 12 }}>{task.title}</Text>
        <Text localize={!task.description} style={{ color: "#C8DDCF", lineHeight: 22, marginTop: 12 }}>{task.description || "Chưa có mô tả."}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
        {[{ label: "NGÀY THỰC HIỆN", value: dayjs(task.scheduledDate).format("DD/MM/YYYY") }, { label: "GIỜ THỰC HIỆN", value: dayjs(task.scheduledTime).format("HH:mm") }].map(item => <View key={item.label} style={{ flex: 1, backgroundColor: Colors.surface, padding: 18, borderRadius: 22 }}><Text style={{ color: Colors.textSecondary, fontSize: 10, fontWeight: "700" }}>{item.label}</Text><Text style={{ color: Colors.textPrimary, fontSize: 19, fontWeight: "800", marginTop: 10 }}>{item.value}</Text></View>)}
      </View>
      <FormSection title="Khu vực & cây trồng">
        {[{ label: "Nông trại", value: task.farmId?.name }, { label: "Lô đất", value: task.plotId?.name }, { label: "Cây trồng", value: task.cropName }, { label: "Ưu tiên", value: task.priority === "high" ? "Cao" : task.priority === "low" ? "Thấp" : "Trung bình" }].map(item => <View key={item.label} style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.border }}><Text style={{ color: Colors.textSecondary, fontSize: 12 }}>{item.label}</Text><Text localize={item.label === "Ưu tiên" || !item.value} style={{ color: Colors.textPrimary, fontWeight: "700", fontSize: 16, marginTop: 5 }}>{item.value || "Chưa cập nhật"}</Text></View>)}
      </FormSection>
      <FormSection title="Ghi chú"><Text localize={!task.note} style={{ color: Colors.textSecondary, lineHeight: 24 }}>{task.note || "Không có ghi chú thêm."}</Text></FormSection>
      {!done && !cancelled ? <PrimaryButton title="Đánh dấu hoàn thành" loading={isPending} onPress={() => void markDone()} /> : null}
    </ScrollView>}
  </SafeAreaView>;
}
