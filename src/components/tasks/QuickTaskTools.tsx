import { FormField } from "@/components/common/FormField";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { Colors } from "@/constant/Colors";
import { getAllTasks } from "@/services/tasks/getAllTask.service";
import { useQuery } from "@tanstack/react-query";
import { useVoiceTask } from "@/hooks/useVoiceTask";
import { useTranslation } from "@/i18n";
import { useAuthStore } from "@/stores/authStore";
import { TaskTemplate, templateKey, useRecentTaskStore } from "@/stores/recentTaskStore";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from "react-native";

type Props = {
  disabled: boolean;
  onSpeech: (speech: string) => void;
  onTemplate: (template: TaskTemplate) => void;
  onTitle: (title: string) => void;
};
const entityId = (entity: unknown): string => typeof entity === "string" ? entity : (entity as { _id?: string } | null)?._id ?? "";

export const QuickTaskTools = ({ disabled, onSpeech, onTemplate, onTitle }: Props) => {
  const { user } = useAuthStore();
  const saved = useRecentTaskStore(state => state.items);
  const query = useQuery({
    queryKey: ["tasks", "recent", user?._id],
    queryFn: () => getAllTasks({ limit: 100 }),
    enabled: !!user?._id,
  });
  const voice = useVoiceTask();
  const { t } = useTranslation();
  const options = [
    ...saved.filter(item => item.userId === user?._id),
    ...(query.data?.data ?? []).filter(task => task.status === "completed").map(task => ({
      title: task.title, farmId: entityId(task.farmId), plotId: entityId(task.plotId),
      cropName: task.cropName || "", description: task.description || "", note: task.note || "",
      priority: task.priority || "medium",
      usedAt: (task as typeof task & { updatedAt?: string; createdAt?: string }).updatedAt || (task as typeof task & { createdAt?: string }).createdAt || task.scheduledDate,
    })),
  ].sort((a, b) => (Date.parse(b.usedAt) || 0) - (Date.parse(a.usedAt) || 0));
  const unique = new Map<string, TaskTemplate>();
  options.forEach(task => { if (!unique.has(templateKey(task))) unique.set(templateKey(task), task); });
  const recent = Array.from(unique.values()).slice(0, 6);
  const speaking = voice.listening || voice.starting;

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Tạo nhanh</Text>
      <Pressable
        cssInterop={false}
        disabled={disabled || voice.starting}
        onPress={() => voice.listening ? voice.stop() : void voice.start()}
        accessibilityRole="button"
        accessibilityLabel={t(voice.listening ? "Dừng ghi giọng nói" : "Nói để tạo việc")}
        style={({ pressed }) => [styles.voice, voice.listening && styles.voiceActive, pressed && { backgroundColor: Colors.deepbark }, disabled && { opacity: 0.6 }]}
      >
        <View style={styles.microphone}>{voice.starting ? <ActivityIndicator color="white" /> : <Ionicons name={voice.listening ? "stop" : "mic-outline"} size={25} color="white" />}</View>
        <View style={{ flex: 1 }}>
          <Text style={styles.voiceTitle}>{voice.starting ? "Đang xin quyền micro…" : voice.listening ? "Đang nghe…" : "Nói để tạo việc"}</Text>
          <Text style={styles.voiceHint}>{voice.listening ? "Dừng ghi giọng nói" : "Nhấn và nói công việc cần làm"}</Text>
        </View>
      </Pressable>
      <Text style={styles.hint}>Nói ví dụ: Ngày mai tưới cà phê lúc 7 giờ sáng.</Text>
      {voice.error ? <Text style={styles.error}>{voice.error}</Text> : null}
      {voice.transcript ? <View style={{ marginTop: 14 }}>
        <FormField label="Nội dung nhận dạng" multiline value={voice.transcript} onChangeText={voice.setTranscript} editable={!speaking && !disabled} />
        <Pressable cssInterop={false} disabled={disabled || speaking} onPress={() => { if (voice.transcript.trim()) onSpeech(voice.transcript.trim()); }} style={[styles.apply, (disabled || speaking) && { opacity: 0.5 }]} accessibilityRole="button">
          <Ionicons name="checkmark-circle-outline" size={20} color={Colors.forestgreen} /><Text style={styles.applyTitle}>Dùng nội dung này</Text>
        </Pressable>
        <Text style={styles.hint}>Kiểm tra và sửa thông tin trước khi lưu.</Text>
      </View> : null}
      <Text style={styles.subheading}>Việc gần đây</Text>
      <Text style={styles.hint}>Chọn một việc để dùng lại nội dung và khu vực.</Text>
      {query.isPending && !recent.length ? <ActivityIndicator color={Colors.leafgreen} style={{ marginVertical: 12 }} /> : null}
      {!recent.length && !query.isPending ? <Text style={styles.hint}>Chưa có việc gần đây. Bạn có thể chọn gợi ý bên dưới.</Text> : null}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingVertical: 12 }}>
        {recent.map(task => <Pressable cssInterop={false} key={templateKey(task)} disabled={disabled || speaking} onPress={() => onTemplate(task)} accessibilityRole="button" style={({ pressed }) => [styles.recent, pressed && { backgroundColor: Colors.border }]}>
          <Ionicons name="refresh-outline" size={19} color={Colors.leafgreen} />
          <Text localize={false} numberOfLines={2} style={styles.recentTitle}>{task.title}</Text>
          {task.cropName ? <Text localize={false} numberOfLines={1} style={styles.hint}>{task.cropName}</Text> : null}
        </Pressable>)}
      </ScrollView>
      <Text style={styles.subheading}>Gợi ý thường dùng</Text>
      <View style={styles.presets}>
        {["Tưới nước", "Bón phân", "Làm cỏ", "Kiểm tra sâu bệnh", "Thu hoạch"].map(title => <Pressable cssInterop={false} key={title} disabled={disabled || speaking} onPress={() => onTitle(t(title))} accessibilityRole="button" style={({ pressed }) => [styles.preset, pressed && { backgroundColor: Colors.border }]}>
          <Text style={styles.presetTitle}>{title}</Text>
        </Pressable>)}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: { backgroundColor: "white", borderWidth: 1, borderColor: Colors.border, borderRadius: 24, padding: 18, marginBottom: 20 },
  heading: { color: Colors.textPrimary, fontSize: 21, fontWeight: "800", marginBottom: 14 },
  voice: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: Colors.forestgreen, borderRadius: 18, padding: 15, minHeight: 80 },
  voiceActive: { backgroundColor: "#9B463C" },
  microphone: { width: 43, height: 43, borderRadius: 15, backgroundColor: "rgba(255,255,255,0.12)", alignItems: "center", justifyContent: "center" },
  voiceTitle: { fontSize: 16, fontWeight: "800", color: "white" },
  voiceHint: { fontSize: 11, color: "#E0EBE2", marginTop: 5 },
  hint: { fontSize: 11, color: Colors.textSecondary, lineHeight: 18, marginTop: 5 },
  error: { fontSize: 12, lineHeight: 19, color: Colors.error, marginTop: 10 },
  subheading: { color: Colors.textPrimary, fontSize: 15, fontWeight: "800", marginTop: 18 },
  recent: { width: 150, padding: 14, borderRadius: 17, backgroundColor: Colors.surfaceMuted, borderWidth: 1, borderColor: Colors.border },
  recentTitle: { fontSize: 13, lineHeight: 19, fontWeight: "700", color: Colors.textPrimary, marginTop: 9 },
  presets: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  preset: { backgroundColor: Colors.surfaceMuted, borderRadius: 12, paddingHorizontal: 12, minHeight: 44, justifyContent: "center" },
  presetTitle: { fontSize: 12, fontWeight: "700", color: Colors.forestgreen },
  apply: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, padding: 13, borderRadius: 14, backgroundColor: Colors.surfaceMuted },
  applyTitle: { fontSize: 14, fontWeight: "700", color: Colors.forestgreen },
});
