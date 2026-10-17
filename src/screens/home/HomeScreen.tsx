import { AppChart } from "@/components/charts/AppChart";
import { Skeleton } from "@/components/Skeleton";
import { Colors } from "@/constant/Colors";
import { useGetAllTask } from "@/hooks/api/tasks/useTask";
import { useFarm } from "@/hooks/api/farm/useFarm";
import { usePlot } from "@/hooks/api/plot/usePlot";
import { useWeather } from "@/hooks/useWeather";
import { formatTaskTime } from "@/utils/formatTimeDate";
import type { Task } from "@/types/tasks";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import type { EChartsOption } from "echarts";
import { useRouter } from "expo-router";
import { ComponentProps, useMemo } from "react";
import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import Animated, { FadeInDown } from "react-native-reanimated";
import { HomeHeader } from "./components/HomeHeader";

const emptyTasks: Task[] = [];
const actions = [
  { title: "Tạo công việc", subtitle: "Lên lịch chăm vườn", icon: "add-outline", path: "/task/add-task", color: "#E7F1DF" },
  { title: "Chẩn đoán cây", subtitle: "Kiểm tra tình trạng", icon: "scan-outline", path: "/(tabs)/diagnosis", color: "#FFF1DC" },
  { title: "Trợ lý canh tác", subtitle: "Hỏi đáp kỹ thuật", icon: "chatbubbles-outline", path: "/chat", color: "#E7EFF5" },
  { title: "Giá nông sản", subtitle: "Theo dõi thị trường", icon: "trending-up-outline", path: "/(tabs)/market", color: "#F3E9DE" },
] as const;

const SectionHeading = ({ title, hint, onPress }: { title: string; hint: string; onPress: () => void }) => (
  <View style={styles.sectionHeading}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Pressable cssInterop={false} onPress={onPress} style={styles.sectionLink} accessibilityRole="button">
      <Text style={styles.link}>{hint}</Text><Ionicons name="chevron-forward" size={15} color={Colors.leafgreen} />
    </Pressable>
  </View>
);

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const weather = useWeather();
  const tasks = useGetAllTask({ limit: 100 });
  const farms = useFarm();
  const plots = usePlot();
  const allTasks = tasks.data?.data ?? emptyTasks;
  const todayKey = dayjs().format("YYYY-MM-DD");
  const today = dayjs();
  const todayTasks = allTasks.filter(task => dayjs(task.scheduledDate).isSame(today, "day") && task.status !== "cancelled");
  const completed = todayTasks.filter(task => task.status === "completed").length;
  const pending = todayTasks.filter(task => task.status === "pending").length;
  const overdue = allTasks.filter(task => task.status === "pending" && dayjs(task.scheduledDate).isBefore(today, "day")).length;
  const percent = todayTasks.length ? Math.round(completed / todayTasks.length * 100) : 0;
  const priorityRank = (value: string) => value === "high" ? 0 : value === "medium" ? 1 : 2;
  const priorityTasks = todayTasks.filter(task => task.status === "pending").sort((a, b) =>
    priorityRank(a.priority) - priorityRank(b.priority) || formatTaskTime(a.scheduledTime).localeCompare(formatTaskTime(b.scheduledTime))
  ).slice(0, 3);
  const ringOption = useMemo<EChartsOption>(() => ({
    animationDuration: 600,
    title: { text: `${percent}%`, subtext: "Hôm nay", left: "center", top: "31%", itemGap: 3, textStyle: { color: "white", fontSize: 25, fontWeight: "bold" }, subtextStyle: { color: "#BCD5C5", fontSize: 10 } },
    series: [{ type: "pie", radius: ["78%", "91%"], center: ["50%", "50%"], silent: true, label: { show: false }, emphasis: { disabled: true }, data: [{ value: completed, itemStyle: { color: "#D7EBA9" } }, { value: Math.max(todayTasks.length - completed, 0) || (todayTasks.length ? 0 : 1), itemStyle: { color: "#3B6954" } }] }],
  }), [percent, completed, todayTasks.length]);
  const weekOption = useMemo<EChartsOption>(() => {
    const days = Array.from({ length: 7 }, (_, i) => dayjs(todayKey).subtract(6 - i, "day"));
    const byDay = days.map(date => allTasks.filter(task => dayjs(task.scheduledDate).isSame(date, "day")));
    return {
      animationDuration: 500,
      grid: { left: 28, right: 8, top: 12, bottom: 28 },
      xAxis: { type: "category", data: days.map(date => date.format("DD/MM")), axisTick: { show: false }, axisLine: { show: false }, axisLabel: { fontSize: 9, color: Colors.textSecondary } },
      yAxis: { type: "value", minInterval: 1, axisLabel: { fontSize: 10, color: Colors.textSecondary }, splitLine: { lineStyle: { color: "#EEF3EC", type: "dashed" } } },
      series: [
        { name: "Đã xong", type: "bar", stack: "tasks", barMaxWidth: 22, itemStyle: { color: Colors.leafgreen, borderRadius: [3, 3, 0, 0] }, data: byDay.map(items => items.filter(task => task.status === "completed").length) },
        { name: "Chờ làm", type: "bar", stack: "tasks", barMaxWidth: 22, itemStyle: { color: "#D9E6BC", borderRadius: [5, 5, 0, 0] }, data: byDay.map(items => items.filter(task => task.status === "pending").length) },
      ],
    };
  }, [allTasks, todayKey]);
  const refresh = () => { void tasks.refetch(); void farms.refetch(); void plots.refetch(); void weather.refetch(); };
  const metric = (value: number | undefined, loading: boolean, error: boolean) => loading || error ? "—" : value ?? 0;
  const goSchedule = () => router.push("/(tabs)/schedule");

  return (
    <View style={styles.screen}>
      <HomeHeader data={weather.data} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content} refreshControl={<RefreshControl refreshing={tasks.isRefetching || weather.isRefetching || farms.isRefetching || plots.isRefetching} onRefresh={refresh} tintColor={Colors.forestgreen} colors={[Colors.forestgreen]} />}>
        <Animated.View entering={FadeInDown.duration(350)} style={styles.hero}>
          <View style={styles.heroDecoration} />
          <View style={styles.heroTop}>
            <View style={styles.datePill}><Ionicons name="sunny-outline" size={14} color="#D7EBA9" /><Text style={styles.dateText}>{today.format("DD.MM.YYYY")}</Text></View>
            <Text style={styles.heroTag}>NHẬT KÝ NHÀ VƯỜN</Text>
          </View>
          <View style={[styles.heroMain, width < 360 && { flexDirection: "column", alignItems: "stretch" }]}>
            <View style={styles.heroCopy}>
              <Text style={styles.heroTitle}>Chăm chút hôm nay,{"\n"}bội thu ngày mai.</Text>
              <Text style={styles.heroHint}>{tasks.isPending ? "Đang tải kế hoạch của bạn…" : tasks.isError ? "Chưa tải được kế hoạch hôm nay" : pending ? `Bạn có ${pending} công việc cần chăm sóc hôm nay.` : "Sẵn sàng cho một ngày chăm vườn mới."}</Text>
            </View>
            <View style={[styles.ring, width < 360 && { alignSelf: "center" }]}>{tasks.isPending || tasks.isError ? <Ionicons name="leaf-outline" size={52} color="#D7EBA9" /> : <AppChart option={ringOption} height={112} accessibilityLabel={`Hôm nay hoàn thành ${completed}/${todayTasks.length} công việc, ${percent}%`} />}</View>
          </View>
          <Pressable cssInterop={false} onPress={goSchedule} accessibilityRole="button" style={({ pressed }) => [styles.heroBottom, pressed && { backgroundColor: "#37634E" }]}>
            <View style={{ flex: 1 }}><Text style={styles.heroBottomTitle}>Lịch chăm sóc hôm nay</Text><Text style={styles.heroBottomHint}>{tasks.isError || tasks.isPending ? "Mở lịch để xem kế hoạch" : `${completed} việc đã xong · ${pending} việc đang chờ`}</Text></View>
            <View style={styles.heroArrow}><Ionicons name="arrow-forward" size={20} color={Colors.forestgreen} /></View>
          </Pressable>
        </Animated.View>

        <View style={styles.metrics}>
          {[
            { title: "Nông trại", icon: "leaf-outline", count: metric(farms.data?.data?.length, farms.isPending, farms.isError) },
            { title: "Lô canh tác", icon: "grid-outline", count: metric(plots.data?.data?.length, plots.isPending, plots.isError) },
          ].map(item => <Pressable cssInterop={false} key={item.title} onPress={goSchedule} style={({ pressed }) => [styles.metric, pressed && { backgroundColor: Colors.surfaceMuted }]} accessibilityRole="button">
            <View style={styles.metricIcon}><Ionicons name={item.icon as ComponentProps<typeof Ionicons>["name"]} size={20} color={Colors.leafgreen} /></View>
            <View style={{ flex: 1 }}><Text style={styles.metricNumber}>{item.count}</Text><Text style={styles.metricLabel}>{item.title}</Text></View>
            <Ionicons name="chevron-forward" size={14} color={Colors.textSecondary} />
          </Pressable>)}
        </View>

        <Text style={styles.toolsTitle}>Tiện ích nhà vườn</Text>
        <View style={styles.actionGrid}>{actions.map(action => <Pressable cssInterop={false} key={action.title} onPress={() => router.push(action.path)} style={({ pressed }) => [styles.action, pressed && { backgroundColor: Colors.surfaceMuted }]} accessibilityRole="button">
          <View style={[styles.actionIcon, { backgroundColor: action.color }]}><Ionicons name={action.icon} size={22} color={Colors.forestgreen} /></View>
          <Text style={styles.actionTitle}>{action.title}</Text><Text style={styles.actionHint}>{action.subtitle}</Text>
          <Ionicons name="arrow-forward-outline" size={15} color={Colors.textSecondary} style={styles.actionArrow} />
        </Pressable>)}</View>

        <Pressable cssInterop={false} accessibilityRole="button" onPress={() => router.push("/crops")}
          style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 14, padding: 18, borderRadius: 22, borderWidth: 1, borderColor: Colors.border, backgroundColor: pressed ? Colors.surfaceMuted : "white", marginTop: 14, marginBottom: 22 })}>
          <View style={styles.metricIcon}><Ionicons name="leaf-outline" size={25} color={Colors.leafgreen} /></View>
          <View style={{ flex: 1 }}><Text style={styles.actionTitle}>Danh mục cây trồng</Text><Text style={styles.caption}>Lưu giống, ghi chú và vùng trồng</Text></View>
          <Ionicons name="chevron-forward" size={19} color={Colors.leafgreen} />
        </Pressable>

        <SectionHeading title="Nhịp chăm sóc" hint="Xem lịch" onPress={goSchedule} />
        <View style={styles.chartCard}>
          <View style={styles.chartHeading}><View style={{ flex: 1 }}><Text style={styles.chartTitle}>Kế hoạch 7 ngày gần đây</Text><Text style={styles.caption}>Trạng thái công việc theo ngày lên lịch</Text></View><View style={styles.chartBadge}><Text style={styles.chartBadgeText}>7 ngày</Text></View></View>
          {tasks.isPending ? <Skeleton width="100%" height={170} borderRadius={12} /> : tasks.isError ? <Text style={styles.emptyHint}>Chưa tải được dữ liệu biểu đồ. Kéo xuống để thử lại.</Text> : <AppChart option={weekOption} height={175} accessibilityLabel="Biểu đồ công việc đã hoàn thành và đang chờ theo ngày lên lịch trong 7 ngày gần đây" />}
          <View style={styles.legend}><View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: Colors.leafgreen }]} /><Text style={styles.caption}>Đã xong</Text></View><View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: "#D9E6BC" }]} /><Text style={styles.caption}>Chờ làm</Text></View></View>
          {tasks.data?.meta?.hasNextPage && <Text style={styles.caption}>Thống kê từ {allTasks.length} công việc đã tải.</Text>}
        </View>

        <SectionHeading title="Việc cần ưu tiên" hint="Tất cả" onPress={() => router.push("/task/tasklist")} />
        {overdue > 0 && <Pressable cssInterop={false} onPress={() => router.push("/task/tasklist")} style={styles.overdue}><Ionicons name="time-outline" size={18} color="#A36528" /><Text style={styles.overdueText}>{overdue} công việc từ ngày trước vẫn đang chờ</Text><Ionicons name="chevron-forward" size={15} color="#A36528" /></Pressable>}
        {tasks.isPending ? <Skeleton width="100%" height={115} borderRadius={22} /> : tasks.isError ? <View style={styles.empty}><Text style={styles.emptyTitle}>Không thể tải công việc</Text><Pressable onPress={() => { void tasks.refetch(); }}><Text style={styles.link}>Thử lại</Text></Pressable></View> : priorityTasks.length ? priorityTasks.map(task => <Pressable cssInterop={false} key={task._id} onPress={() => router.push({ pathname: "/task/[id]", params: { id: task._id } })} style={({ pressed }) => [styles.task, pressed && { backgroundColor: Colors.surfaceMuted }]} accessibilityRole="button">
          <View style={styles.taskTime}><Ionicons name="time-outline" size={18} color={Colors.leafgreen} /><Text style={styles.time}>{formatTaskTime(task.scheduledTime)}</Text></View>
          <View style={{ flex: 1, minWidth: 0 }}><Text localize={false} style={styles.taskTitle} numberOfLines={2}>{task.title}</Text><Text localize={!task.farmId?.name && !task.plotId?.name} style={styles.caption} numberOfLines={1}>{[task.farmId?.name, task.plotId?.name].filter(Boolean).join(" · ") || "Công việc chăm sóc"}</Text><Text style={[styles.priority, task.priority === "high" && { color: "#B26A2D" }]}>{task.priority === "high" ? "Ưu tiên cao" : task.priority === "low" ? "Ưu tiên thấp" : "Ưu tiên vừa"}</Text></View>
          <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
        </Pressable>) : <View style={styles.empty}><View style={styles.emptyIcon}><Ionicons name="checkmark-done-outline" size={26} color={Colors.leafgreen} /></View><Text style={styles.emptyTitle}>{todayTasks.length ? "Đã xong các việc hôm nay!" : "Hôm nay chưa có kế hoạch"}</Text><Text style={styles.emptyHint}>Thêm công việc để chủ động chăm sóc mùa vụ.</Text><Pressable onPress={() => router.push("/task/add-task")} style={styles.emptyButton}><Text style={styles.link}>+ Tạo công việc</Text></Pressable></View>}

        <SectionHeading title="Thời tiết quanh vườn" hint="Dự báo" onPress={() => router.push("/weather")} />
        {weather.isLoading ? <Skeleton width="100%" height={150} borderRadius={24} /> : weather.data ? <Pressable cssInterop={false} onPress={() => router.push("/weather")} style={styles.weather} accessibilityRole="button">
          <View style={styles.weatherMain}><View style={{ flex: 1 }}><View style={styles.weatherLocation}><Ionicons name="location-outline" size={13} color={Colors.textSecondary} /><Text style={styles.caption}>{weather.data.name}</Text></View><Text style={styles.temperature}>{Math.round(weather.data.main.temp)}<Text style={styles.degree}>°C</Text></Text><Text style={styles.weatherDescription}>{weather.data.weather[0]?.description}</Text></View><Image source={{ uri: `https://openweathermap.org/img/wn/${weather.data.weather[0]?.icon}@4x.png` }} style={{ width: 94, height: 94 }} /></View>
          <View style={styles.weatherFooter}><View style={styles.weatherDetail}><Ionicons name="water-outline" size={17} color={Colors.leafgreen} /><Text style={styles.weatherDetailText}>Độ ẩm {weather.data.main.humidity}%</Text></View><View style={styles.weatherDetail}><Ionicons name="flag-outline" size={17} color={Colors.leafgreen} /><Text style={styles.weatherDetailText}>Gió {(weather.data.wind.speed * 3.6).toFixed(1)} km/h</Text></View></View>
        </Pressable> : <View style={styles.empty}><Ionicons name="cloud-outline" size={28} color={Colors.textSecondary} /><Text style={styles.emptyTitle}>Chưa có dữ liệu thời tiết</Text><Text style={styles.emptyHint}>Kiểm tra quyền vị trí và kết nối mạng.</Text></View>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.offwhite },
  content: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 30 },
  hero: { backgroundColor: Colors.forestgreen, borderRadius: 28, padding: 20, overflow: "hidden" },
  heroDecoration: { position: "absolute", width: 210, height: 210, borderRadius: 105, borderWidth: 26, borderColor: "#285B46", right: -95, top: -85 },
  heroTop: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10 },
  datePill: { flexDirection: "row", gap: 6, alignItems: "center", backgroundColor: "#2D614A", paddingHorizontal: 10, paddingVertical: 7, borderRadius: 10 },
  dateText: { fontSize: 10, color: "#D7EBA9", fontWeight: "700" },
  heroTag: { fontSize: 8, color: "#BBD5C4", fontWeight: "700", letterSpacing: 1 },
  heroMain: { flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 19 },
  heroCopy: { flex: 1, minWidth: 0 },
  heroTitle: { color: "white", fontSize: 21, lineHeight: 29, fontWeight: "800" },
  heroHint: { color: "#BCD5C5", fontSize: 11, lineHeight: 18, marginTop: 9 },
  ring: { width: 112, height: 112, alignItems: "center", justifyContent: "center" },
  heroBottom: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#2D614A", borderRadius: 16, padding: 13 },
  heroBottomTitle: { fontSize: 13, fontWeight: "700", color: "white" },
  heroBottomHint: { fontSize: 10, color: "#BCD5C5", marginTop: 4 },
  heroArrow: { width: 35, height: 35, borderRadius: 12, backgroundColor: "#D7EBA9", alignItems: "center", justifyContent: "center" },
  metrics: { flexDirection: "row", gap: 10, marginTop: 14 },
  metric: { flex: 1, minWidth: 0, flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "white", borderRadius: 20, borderWidth: 1, borderColor: Colors.border, padding: 12 },
  metricIcon: { width: 34, height: 34, borderRadius: 12, backgroundColor: Colors.surfaceMuted, alignItems: "center", justifyContent: "center" },
  metricNumber: { fontSize: 22, fontWeight: "800", color: Colors.textPrimary },
  metricLabel: { fontSize: 10, color: Colors.textSecondary, marginTop: 2 },
  toolsTitle: { marginTop: 25, marginBottom: 12, fontSize: 18, fontWeight: "800", color: Colors.textPrimary },
  actionGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 10 },
  action: { width: "48.5%", borderWidth: 1, borderColor: Colors.border, borderRadius: 22, padding: 16, backgroundColor: "white" },
  actionIcon: { width: 40, height: 40, borderRadius: 14, alignItems: "center", justifyContent: "center", marginBottom: 13 },
  actionTitle: { fontSize: 13, fontWeight: "800", color: Colors.textPrimary },
  actionHint: { fontSize: 10, color: Colors.textSecondary, marginTop: 5 },
  actionArrow: { position: "absolute", right: 14, top: 18 },
  sectionHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10, marginTop: 27, marginBottom: 12 },
  sectionTitle: { flex: 1, fontSize: 20, fontWeight: "800", color: Colors.textPrimary },
  sectionLink: { flexDirection: "row", alignItems: "center", gap: 2, minHeight: 40 },
  link: { fontSize: 12, fontWeight: "700", color: Colors.leafgreen },
  chartCard: { padding: 18, borderWidth: 1, borderColor: Colors.border, borderRadius: 24, backgroundColor: "white" },
  chartHeading: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  chartTitle: { fontSize: 15, fontWeight: "800", color: Colors.textPrimary },
  caption: { fontSize: 10, color: Colors.textSecondary, lineHeight: 16, marginTop: 3 },
  chartBadge: { backgroundColor: Colors.surfaceMuted, padding: 8, borderRadius: 10 },
  chartBadgeText: { fontSize: 10, fontWeight: "700", color: Colors.leafgreen },
  legend: { flexDirection: "row", gap: 18, justifyContent: "center", marginTop: 4 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 7, height: 7, borderRadius: 3 },
  overdue: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#FFF2DE", borderRadius: 14, padding: 13, marginBottom: 10 },
  overdueText: { flex: 1, color: "#A36528", fontSize: 11, lineHeight: 17 },
  task: { flexDirection: "row", alignItems: "center", gap: 13, backgroundColor: "white", borderWidth: 1, borderColor: Colors.border, borderRadius: 22, padding: 15, marginBottom: 10 },
  taskTime: { width: 46, alignItems: "center", gap: 7, paddingVertical: 10, borderRadius: 13, backgroundColor: Colors.surfaceMuted },
  time: { fontSize: 11, fontWeight: "700", color: Colors.forestgreen },
  taskTitle: { fontSize: 15, lineHeight: 21, fontWeight: "800", color: Colors.textPrimary },
  priority: { fontSize: 10, fontWeight: "700", color: Colors.leafgreen, marginTop: 6 },
  empty: { alignItems: "center", gap: 9, padding: 24, backgroundColor: "white", borderRadius: 22, borderWidth: 1, borderColor: Colors.border },
  emptyIcon: { backgroundColor: Colors.surfaceMuted, width: 52, height: 52, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  emptyTitle: { fontSize: 15, fontWeight: "800", color: Colors.textPrimary, textAlign: "center" },
  emptyHint: { fontSize: 12, lineHeight: 19, color: Colors.textSecondary, textAlign: "center", paddingVertical: 8 },
  emptyButton: { padding: 12, backgroundColor: Colors.surfaceMuted, borderRadius: 12 },
  weather: { backgroundColor: "#F1F4E9", borderRadius: 24, borderWidth: 1, borderColor: "#DFE7D7", padding: 20 },
  weatherMain: { flexDirection: "row", alignItems: "center" },
  weatherLocation: { flexDirection: "row", alignItems: "center", gap: 4 },
  temperature: { fontSize: 44, fontWeight: "800", color: Colors.textPrimary, marginTop: 5 },
  degree: { fontSize: 22 },
  weatherDescription: { fontSize: 12, color: Colors.textSecondary, textTransform: "capitalize" },
  weatherFooter: { flexDirection: "row", flexWrap: "wrap", gap: 14, borderTopWidth: 1, borderTopColor: "#DDE5D3", paddingTop: 14, marginTop: 17 },
  weatherDetail: { flexDirection: "row", alignItems: "center", gap: 5 },
  weatherDetailText: { fontSize: 11, color: Colors.textPrimary },
});
