import { Colors } from "@/constant/Colors";
import { translate } from "@/i18n";
import { Task } from "@/types/tasks";
import { formatTaskTime } from "@/utils/formatTimeDate";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";

type Props = {
  task: Task;
  last: boolean;
  busy: boolean;
  onPress: () => void;
  onMarkDone: () => void;
  onDelete: () => void;
};

export const TaskTodaySchedule = ({ task, last, busy, onPress, onMarkDone, onDelete }: Props) => {
  const done = task.status === "completed";
  const cancelled = task.status === "cancelled";
  const color = done ? Colors.leafgreen : cancelled ? Colors.textSecondary : Colors.brandorange;
  const status = done ? "Hoàn thành" : cancelled ? "Đã hủy" : "Chờ thực hiện";
  const openMenu = () => Alert.alert(task.title, translate("Thao tác với công việc"), [
    { text: translate("Xem chi tiết"), onPress },
    { text: translate("Xóa công việc"), style: "destructive", onPress: onDelete },
    { text: translate("Đóng"), style: "cancel" },
  ]);
  return (
    <View style={styles.row}>
      <View style={styles.rail}>
        <Text style={styles.time}>{formatTaskTime(task.scheduledTime)}</Text>
        <View style={[styles.node, { borderColor: color }]}><View style={[styles.nodeInner, { backgroundColor: color }]} /></View>
        {!last && <View style={styles.line} />}
      </View>
      <View style={[styles.card, cancelled && { opacity: 0.7 }]}>
        <View style={styles.top}>
          <View style={[styles.badge, { backgroundColor: done ? Colors.surfaceMuted : cancelled ? Colors.offwhite : "#FFF3E4" }]}>
            <View style={[styles.statusDot, { backgroundColor: color }]} />
            <Text style={[styles.status, { color }]}>{status}</Text>
          </View>
          <TouchableOpacity onPress={openMenu} disabled={busy} accessibilityRole="button" accessibilityLabel={`Thao tác với ${task.title}`} style={styles.menu}>
            <Ionicons name="ellipsis-horizontal" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onPress} accessibilityRole="button" style={styles.content}>
          <Text localize={false} style={[styles.title, cancelled && { textDecorationLine: "line-through" }]}>{task.title}</Text>
          <View style={styles.location}>
            <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
            <Text localize={!task.farmId?.name && !task.plotId?.name} style={styles.meta}>{[task.farmId?.name, task.plotId?.name].filter(Boolean).join(" · ") || "Chưa có thông tin khu vực"}</Text>
          </View>
          {task.cropName ? <Text style={styles.crop}>Cây trồng: <Text localize={false}>{task.cropName}</Text></Text> : null}
        </TouchableOpacity>
        <View style={styles.bottom}>
          <View style={styles.priority}>
            <Ionicons name="flag-outline" size={13} color={task.priority === "high" ? Colors.error : Colors.textSecondary} />
            <Text style={[styles.priorityText, task.priority === "high" && { color: Colors.error }]}>{task.priority === "high" ? "Ưu tiên cao" : task.priority === "low" ? "Ưu tiên thấp" : "Ưu tiên vừa"}</Text>
          </View>
          {task.status === "pending" ? (
            <TouchableOpacity disabled={busy} onPress={onMarkDone} accessibilityRole="button" accessibilityLabel={`Hoàn thành ${task.title}`} style={[styles.complete, busy && { opacity: 0.6 }]}>
              {busy ? <ActivityIndicator size="small" color={Colors.forestgreen} /> : <Ionicons name="checkmark" size={16} color={Colors.forestgreen} />}
              <Text style={styles.completeText}>Xong</Text>
            </TouchableOpacity>
          ) : <Ionicons name={done ? "checkmark-circle" : "close-circle-outline"} size={23} color={color} />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 12 },
  rail: { width: 46, alignItems: "center", paddingTop: 19 },
  time: { fontSize: 12, fontWeight: "800", color: Colors.textPrimary },
  node: { width: 14, height: 14, borderRadius: 7, borderWidth: 1.5, alignItems: "center", justifyContent: "center", marginTop: 11, backgroundColor: Colors.offwhite, zIndex: 1 },
  nodeInner: { width: 5, height: 5, borderRadius: 3 },
  line: { width: 1.5, flex: 1, backgroundColor: Colors.border },
  card: { flex: 1, minWidth: 0, backgroundColor: "white", borderRadius: 22, borderWidth: 1, borderColor: Colors.border, marginBottom: 14, padding: 15 },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 5 },
  badge: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 8 },
  statusDot: { width: 5, height: 5, borderRadius: 3 },
  status: { fontSize: 10, fontWeight: "700" },
  menu: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  content: { paddingVertical: 8 },
  title: { fontSize: 17, lineHeight: 24, fontWeight: "800", color: Colors.textPrimary },
  location: { flexDirection: "row", gap: 5, alignItems: "flex-start", marginTop: 8 },
  meta: { flex: 1, fontSize: 12, lineHeight: 18, color: Colors.textSecondary },
  crop: { fontSize: 11, lineHeight: 17, color: Colors.textSecondary, marginTop: 4 },
  bottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, paddingTop: 10, marginTop: 4, borderTopWidth: 1, borderTopColor: Colors.surfaceMuted },
  priority: { flex: 1, flexDirection: "row", alignItems: "center", gap: 5 },
  priorityText: { fontSize: 10, fontWeight: "600", color: Colors.textSecondary },
  complete: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: Colors.surfaceMuted, borderRadius: 10, paddingHorizontal: 11, minHeight: 38 },
  completeText: { fontSize: 12, fontWeight: "700", color: Colors.forestgreen },
});
