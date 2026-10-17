import { Colors } from "@/constant/Colors";
import { translate } from "@/i18n";
import { useDeleteTask, useGetAllTask, useUpdateTask } from "@/hooks/api/tasks/useTask";
import { ManageFarmScreen } from "@/screens/ManageFarmScreen/ManageFarmScreen";
import { ManagePlotScreen } from "@/screens/ManagePlotScreen/ManagePlotScreen";
import { Task } from "@/types/tasks";
import { formatTaskTime } from "@/utils/formatTimeDate";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { ComponentProps, useState } from "react";
import { ActivityIndicator, Alert, Pressable, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ScheduleHeader } from "./components/SheduleHeader";
import { TaskTodaySchedule } from "./components/TaskTodaySchedule";
import { WeekCalendar } from "./components/WeekCalendar";

type Filter = "all" | "pending" | "completed" | "cancelled";
const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chờ làm" },
  { value: "completed", label: "Đã xong" },
  { value: "cancelled", label: "Đã hủy" },
];
const dayNames = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
const timeOrder = (task: Task) => {
  const label = formatTaskTime(task.scheduledTime);
  if (label === "—") return 24 * 60;
  const [hours, minutes] = label.split(":").map(Number);
  return hours * 60 + minutes;
};

const Shortcut = ({ icon, title, onPress }: { icon: ComponentProps<typeof Ionicons>["name"]; title: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.shortcut} onPress={onPress} accessibilityRole="button">
    <View style={styles.shortcutIcon}><Ionicons name={icon} size={20} color={Colors.forestgreen} /></View>
    <Text style={styles.shortcutText}>{title}</Text>
  </TouchableOpacity>
);

export const ScheduleScreen = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [filter, setFilter] = useState<Filter>("all");
  const [farmVisible, setFarmVisible] = useState(false);
  const [plotVisible, setPlotVisible] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const query = useGetAllTask({ limit: 100 });
  const update = useUpdateTask();
  const deletion = useDeleteTask();
  const tasks = query.data?.data ?? [];
  const selected = dayjs(selectedDate);
  const tasksToday = tasks.filter(task => dayjs(task.scheduledDate).isSame(selected, "day")).sort((a, b) => timeOrder(a) - timeOrder(b));
  const agenda = tasksToday.filter(task => filter === "all" || task.status === filter);
  const completed = tasksToday.filter(task => task.status === "completed").length;
  const pending = tasksToday.filter(task => task.status === "pending").length;
  const activeTotal = tasksToday.filter(task => task.status !== "cancelled").length;
  const upcoming = tasks.filter(task => task.status === "pending" && dayjs(task.scheduledDate).isAfter(selected, "day"))
    .sort((a, b) => dayjs(a.scheduledDate).startOf("day").valueOf() - dayjs(b.scheduledDate).startOf("day").valueOf() || timeOrder(a) - timeOrder(b))
    .slice(0, 5);
  const busy = update.isPending || deletion.isPending;
  const create = () => router.push({ pathname: "/task/add-task", params: { date: selectedDate } });
  const openTask = (id: string) => router.push({ pathname: "/task/[id]", params: { id } });
  const chooseDate = (date: string) => {
    setSelectedDate(date);
    setFilter("all");
  };
  const markDone = async (id: string) => {
    if (busy) return;
    setBusyId(id);
    try {
      await update.mutateAsync({ id, status: "completed" });
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    } catch {
      // The mutation displays the API error.
    } finally {
      setBusyId(null);
    }
  };
  const confirmDelete = (id: string) => {
    if (busy) return;
    Alert.alert(translate("Xóa công việc?"), translate("Thao tác này không thể hoàn tác."), [
      { text: translate("Hủy"), style: "cancel" },
      { text: translate("Xóa"), style: "destructive", onPress: async () => {
        setBusyId(id);
        try { await deletion.mutateAsync(id); } catch { /* The mutation displays the API error. */ }
        finally { setBusyId(null); }
      } },
    ]);
  };

  return (
    <View style={styles.screen}>
      <ScheduleHeader onCreate={create} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={query.isRefetching} onRefresh={() => { void query.refetch(); }} tintColor={Colors.forestgreen} colors={[Colors.forestgreen]} />}
      >
        <Animated.View entering={FadeInDown.duration(350)}>
          <WeekCalendar
            selectedDate={selectedDate}
            onDateSelect={chooseDate}
            eventDates={tasks.filter(task => task.status !== "cancelled").map(task => dayjs(task.scheduledDate).format("YYYY-MM-DD"))}
            completed={completed}
            total={activeTotal}
          />
        </Animated.View>

        <View style={styles.shortcuts}>
          <Shortcut icon="leaf-outline" title="Nông trại" onPress={() => setFarmVisible(true)} />
          <Shortcut icon="grid-outline" title="Lô đất" onPress={() => setPlotVisible(true)} />
          <Shortcut icon="list-outline" title="Mọi công việc" onPress={() => router.push("/task/tasklist")} />
        </View>

        <Animated.View entering={FadeInDown.delay(90).duration(350)}>
          <View style={styles.agendaHeading}>
            <View style={{ flex: 1 }}>
              <Text style={styles.eyebrow}>{selected.isSame(dayjs(), "day") ? "LỊCH HÔM NAY" : "KẾ HOẠCH TRONG NGÀY"}</Text>
              <Text style={styles.dayTitle}>{dayNames[selected.day()]}, {selected.format("DD/MM")}</Text>
              <Text style={styles.dayHint}>{pending ? `${pending} việc chờ làm · ${completed} việc đã xong` : tasksToday.length ? "Các công việc trong ngày của bạn" : "Một ngày trống để lên kế hoạch mới"}</Text>
            </View>
            <View style={styles.dayCount}><Text style={styles.dayCountText}>{tasksToday.length}</Text><Text style={styles.dayCountLabel}>công việc</Text></View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
            {filters.map(item => {
              const count = item.value === "all" ? tasksToday.length : tasksToday.filter(task => task.status === item.value).length;
              const active = filter === item.value;
              return (
                <Pressable
                  cssInterop={false}
                  key={item.value}
                  onPress={() => setFilter(item.value)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: active }}
                  style={({ pressed }) => [
                    styles.filter,
                    active && styles.activeFilter,
                    pressed && { backgroundColor: active ? Colors.deepbark : Colors.border },
                  ]}
                >
                  <Text style={[styles.filterText, active && styles.activeFilterText]}>{item.label}</Text>
                  <Text style={[styles.filterCount, active && styles.activeFilterText]}>{count}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
          {query.isPending ? (
            <View style={styles.empty}><ActivityIndicator color={Colors.forestgreen} /><Text style={styles.emptyHint}>Đang tải lịch trình…</Text></View>
          ) : query.isError ? (
            <View style={styles.empty}>
              <Ionicons name="cloud-offline-outline" size={32} color={Colors.textSecondary} />
              <Text style={styles.emptyTitle}>Không thể tải lịch trình</Text>
              <Text style={styles.emptyHint}>Kéo xuống hoặc nhấn bên dưới để tải lại.</Text>
              <TouchableOpacity onPress={() => { void query.refetch(); }} style={styles.emptyAction}><Text style={styles.emptyActionText}>Thử lại</Text></TouchableOpacity>
            </View>
          ) : agenda.length === 0 ? (
            <View style={styles.empty}>
              <View style={styles.emptyIcon}><Ionicons name={filter === "all" ? "calendar-outline" : "checkmark-done-outline"} size={30} color={Colors.leafgreen} /></View>
              <Text style={styles.emptyTitle}>{filter === "all" ? "Chưa có kế hoạch cho ngày này" : "Không có công việc ở trạng thái này"}</Text>
              <Text style={styles.emptyHint}>{filter === "all" ? "Thêm một công việc để bắt đầu chăm sóc vườn." : "Chọn Tất cả để xem các công việc trong ngày."}</Text>
              <TouchableOpacity onPress={filter === "all" ? create : () => setFilter("all")} style={styles.emptyAction}>
                <Ionicons name={filter === "all" ? "add" : "list-outline"} size={17} color={Colors.forestgreen} />
                <Text style={styles.emptyActionText}>{filter === "all" ? "Tạo công việc" : "Xem tất cả"}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.timeline}>
              {agenda.map((task, index) => (
                <TaskTodaySchedule key={task._id} task={task} last={index === agenda.length - 1} busy={busy || busyId === task._id} onPress={() => openTask(task._id)} onMarkDone={() => { void markDone(task._id); }} onDelete={() => confirmDelete(task._id)} />
              ))}
            </View>
          )}
        </Animated.View>

        {!query.isPending && !query.isError && upcoming.length > 0 && (
          <View style={styles.upcoming}>
            <View style={styles.sectionHeading}>
              <View style={{ flex: 1 }}>
                <Text style={styles.eyebrow}>CHUẨN BỊ TRƯỚC</Text>
                <Text style={styles.sectionTitle}>Những ngày tiếp theo</Text>
              </View>
              <Ionicons name="arrow-forward-outline" size={22} color={Colors.leafgreen} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingVertical: 4 }}>
              {upcoming.map(task => (
                <TouchableOpacity key={task._id} style={styles.upcomingCard} onPress={() => openTask(task._id)} accessibilityRole="button">
                  <View style={styles.upcomingDate}>
                    <Ionicons name="calendar-outline" size={14} color={Colors.forestgreen} />
                    <Text style={styles.upcomingDateText}>{dayjs(task.scheduledDate).format("DD/MM")} · {formatTaskTime(task.scheduledTime)}</Text>
                  </View>
                  <Text localize={false} style={styles.upcomingTitle} numberOfLines={2}>{task.title}</Text>
                  <Text localize={!task.plotId?.name && !task.farmId?.name} style={styles.upcomingLocation} numberOfLines={1}>{task.plotId?.name || task.farmId?.name || "Công việc chăm sóc"}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        {query.data?.meta?.hasNextPage && (
          <TouchableOpacity onPress={() => router.push("/task/tasklist")} style={styles.more}>
            <Text style={styles.moreText}>Lịch đang hiển thị {tasks.length} công việc đã tải. Xem danh sách đầy đủ</Text>
            <Ionicons name="chevron-forward" size={17} color={Colors.leafgreen} />
          </TouchableOpacity>
        )}
      </ScrollView>
      <ManageFarmScreen visibleFarm={farmVisible} onCloseFarm={() => setFarmVisible(false)} />
      <ManagePlotScreen visible={plotVisible} onClose={() => setPlotVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.offwhite },
  scroll: { paddingHorizontal: 20, paddingBottom: 28 },
  shortcuts: { flexDirection: "row", gap: 10, marginTop: 16, marginBottom: 28 },
  shortcut: { flex: 1, minWidth: 0, alignItems: "center", gap: 8, backgroundColor: "white", paddingVertical: 14, paddingHorizontal: 4, borderRadius: 19, borderWidth: 1, borderColor: Colors.border },
  shortcutIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: Colors.surfaceMuted, alignItems: "center", justifyContent: "center" },
  shortcutText: { fontSize: 11, fontWeight: "700", color: Colors.textPrimary, textAlign: "center" },
  agendaHeading: { flexDirection: "row", alignItems: "center", gap: 12 },
  eyebrow: { fontSize: 10, fontWeight: "800", letterSpacing: 1.5, color: Colors.textSecondary },
  dayTitle: { fontSize: 22, fontWeight: "800", color: Colors.textPrimary, marginTop: 7 },
  dayHint: { color: Colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 5 },
  dayCount: { alignItems: "center", backgroundColor: "#EAF0DE", paddingVertical: 11, paddingHorizontal: 13, borderRadius: 17 },
  dayCountText: { fontSize: 24, fontWeight: "800", color: Colors.forestgreen },
  dayCountLabel: { fontSize: 9, color: Colors.forestgreen, marginTop: 2 },
  filters: { gap: 8, paddingTop: 18, paddingBottom: 20 },
  filter: { flexDirection: "row", alignItems: "center", gap: 7, borderRadius: 12, paddingHorizontal: 12, minHeight: 44, backgroundColor: "#EAF0EB" },
  activeFilter: { backgroundColor: Colors.forestgreen },
  filterText: { fontSize: 12, fontWeight: "700", color: Colors.textPrimary },
  filterCount: { fontSize: 11, color: Colors.textPrimary },
  activeFilterText: { color: "white" },
  timeline: { paddingTop: 2 },
  empty: { alignItems: "center", paddingHorizontal: 24, paddingVertical: 30, backgroundColor: "white", borderRadius: 24, borderWidth: 1, borderColor: Colors.border },
  emptyIcon: { width: 66, height: 66, borderRadius: 22, backgroundColor: Colors.surfaceMuted, alignItems: "center", justifyContent: "center", marginBottom: 5 },
  emptyTitle: { fontSize: 17, fontWeight: "800", color: Colors.textPrimary, textAlign: "center", marginTop: 12, lineHeight: 24 },
  emptyHint: { fontSize: 13, color: Colors.textSecondary, textAlign: "center", lineHeight: 21, marginTop: 7 },
  emptyAction: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 18, paddingHorizontal: 18, minHeight: 44, backgroundColor: Colors.surfaceMuted, borderRadius: 13 },
  emptyActionText: { fontSize: 13, fontWeight: "700", color: Colors.forestgreen },
  upcoming: { marginTop: 26 },
  sectionHeading: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 },
  sectionTitle: { fontSize: 21, fontWeight: "800", color: Colors.textPrimary, marginTop: 7 },
  upcomingCard: { width: 215, borderRadius: 22, borderWidth: 1, borderColor: Colors.border, backgroundColor: "white", padding: 17 },
  upcomingDate: { flexDirection: "row", gap: 6, alignItems: "center" },
  upcomingDateText: { fontSize: 11, fontWeight: "700", color: Colors.forestgreen },
  upcomingTitle: { fontSize: 16, fontWeight: "800", lineHeight: 23, color: Colors.textPrimary, marginTop: 13, minHeight: 46 },
  upcomingLocation: { fontSize: 12, color: Colors.textSecondary, marginTop: 12 },
  more: { flexDirection: "row", gap: 8, alignItems: "center", paddingVertical: 20 },
  moreText: { flex: 1, color: Colors.leafgreen, fontSize: 12, lineHeight: 19 },
});
