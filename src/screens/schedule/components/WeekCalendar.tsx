import { Colors } from "@/constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";

type Props = {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  eventDates: string[];
  completed: number;
  total: number;
};

const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export const WeekCalendar = ({
  selectedDate,
  onDateSelect,
  eventDates,
  completed,
  total,
}: Props) => {
  const [mode, setMode] = useState<"week" | "month">("month");
  const monthly = mode === "month";
  const selected = dayjs(selectedDate);
  const todayKey = dayjs().format("YYYY-MM-DD");
  const anchor = monthly ? selected.startOf("month") : selected;
  const leadingDays = (anchor.day() + 6) % 7;
  const start = anchor.subtract(leadingDays, "day");
  const cellCount = monthly
    ? Math.ceil((selected.daysInMonth() + leadingDays) / 7) * 7
    : 7;
  const dates = Array.from({ length: cellCount }, (_, index) => start.add(index, "day"));
  const eventCounts = new Map<string, number>();
  eventDates.forEach(date => eventCounts.set(date, (eventCounts.get(date) ?? 0) + 1));
  const progress = total ? Math.min(100, Math.round(completed / total * 100)) : 0;
  const navigate = (direction: number) => {
    onDateSelect(selected.add(direction, monthly ? "month" : "week").format("YYYY-MM-DD"));
  };

  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <View style={styles.monthLabel}>
          <Text style={styles.month}>Tháng {selected.month() + 1}</Text>
          <Text style={styles.year}>{selected.year()}</Text>
        </View>
        <View style={styles.navigation}>
          <TouchableOpacity
            style={styles.arrow}
            accessibilityRole="button"
            accessibilityLabel={monthly ? "Tháng trước" : "Tuần trước"}
            onPress={() => navigate(-1)}
          >
            <Ionicons name="chevron-back" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.navDivider} />
          <TouchableOpacity
            style={styles.arrow}
            accessibilityRole="button"
            accessibilityLabel={monthly ? "Tháng sau" : "Tuần sau"}
            onPress={() => navigate(1)}
          >
            <Ionicons name="chevron-forward" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.toolbar}>
        <View style={styles.segmented}>
          {(["week", "month"] as const).map(value => (
            <Pressable
              cssInterop={false}
              key={value}
              style={({ pressed }) => [
                styles.segment,
                mode === value && styles.segmentActive,
                pressed && { backgroundColor: Colors.surfaceMuted },
              ]}
              onPress={() => setMode(value)}
              accessibilityRole="tab"
              accessibilityState={{ selected: mode === value }}
            >
              <Text numberOfLines={1} style={[styles.segmentText, mode === value && styles.segmentActiveText]}>
                {value === "week" ? "Tuần" : "Tháng"}
              </Text>
            </Pressable>
          ))}
        </View>
        <TouchableOpacity
          style={styles.todayButton}
          onPress={() => onDateSelect(todayKey)}
          accessibilityRole="button"
          accessibilityLabel="Chọn ngày hôm nay"
        >
          <View style={styles.todayDot} />
          <Text numberOfLines={1} style={styles.todayText}>Hôm nay</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekdays}>
        {weekdays.map((day, index) => (
          <Text key={day} style={[styles.weekday, index > 4 && styles.weekendLabel]}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {dates.map(date => {
          const key = date.format("YYYY-MM-DD");
          const active = key === selectedDate;
          const today = key === todayKey;
          const outside = monthly && !date.isSame(selected, "month");
          const count = eventCounts.get(key) ?? 0;
          return (
            <View key={key} style={styles.cell}>
              <TouchableOpacity
                onPress={() => onDateSelect(key)}
                accessibilityRole="button"
                accessibilityLabel={`Ngày ${date.format("DD/MM/YYYY")}${today ? ", hôm nay" : ""}${count ? `, ${count} công việc` : ""}`}
                accessibilityState={{ selected: active }}
                style={[styles.day, !monthly && styles.weekDay]}
              >
                <View style={[
                  styles.dateCircle,
                  today && styles.todayCircle,
                  active && styles.selectedCircle,
                ]}>
                  <Text style={[
                    styles.date,
                    outside && styles.outsideDate,
                    today && styles.todayDate,
                    active && styles.selectedDate,
                  ]}>
                    {date.date()}
                  </Text>
                </View>
                <View style={styles.markers}>
                  {Array.from({ length: Math.min(count, 3) }, (_, index) => (
                    <View key={index} style={[
                      styles.eventDot,
                      outside && { opacity: 0.3 },
                      active && styles.selectedEventDot,
                    ]} />
                  ))}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={styles.eventDot} />
          <Text style={styles.legendText}>Có công việc</Text>
        </View>
        <Text style={styles.selectedLabel}>Đang chọn {selected.format("DD/MM")}</Text>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryIcon}>
          <Ionicons name={total && completed === total ? "checkmark-done-outline" : "leaf-outline"} size={18} color={Colors.leafgreen} />
        </View>
        <View style={styles.summaryContent}>
          <Text style={styles.summaryTitle}>
            {total ? `${completed} / ${total} việc đã hoàn thành` : "Ngày này chưa có kế hoạch"}
          </Text>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${progress}%` }]} />
          </View>
        </View>
        <Text style={styles.percent}>{progress}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: "#E4EBE5",
  },
  heading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12, paddingHorizontal: 4 },
  monthLabel: { flex: 1 },
  month: { color: Colors.textPrimary, fontSize: 24, fontWeight: "800" },
  year: { color: Colors.textSecondary, fontSize: 13, marginTop: 3 },
  navigation: { flexDirection: "row", alignItems: "center", backgroundColor: "#F5F7F4", borderRadius: 14 },
  arrow: { width: 42, height: 44, alignItems: "center", justifyContent: "center" },
  navDivider: { width: 1, height: 16, backgroundColor: Colors.border },
  toolbar: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 18, marginBottom: 22, paddingHorizontal: 4 },
  segmented: { width: 140, flexShrink: 0, flexDirection: "row", alignItems: "center", borderRadius: 12, backgroundColor: "#F2F5F1", padding: 3 },
  segment: { flex: 1, minWidth: 0, minHeight: 44, paddingHorizontal: 4, alignItems: "center", justifyContent: "center", borderRadius: 9 },
  segmentActive: { backgroundColor: "white", shadowColor: Colors.shadow, shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, shadowRadius: 3, elevation: 1 },
  segmentText: { fontSize: 12, fontWeight: "600", color: Colors.textSecondary },
  segmentActiveText: { color: Colors.forestgreen, fontWeight: "800" },
  todayButton: { flexDirection: "row", alignItems: "center", gap: 6, minHeight: 44, paddingHorizontal: 8 },
  todayDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.leafgreen },
  todayText: { color: Colors.leafgreen, fontSize: 12, fontWeight: "700" },
  weekdays: { flexDirection: "row", paddingBottom: 10, marginBottom: 4, borderBottomWidth: 1, borderBottomColor: "#F0F3EF" },
  weekday: { flex: 1, textAlign: "center", color: Colors.textSecondary, fontSize: 11, fontWeight: "600" },
  weekendLabel: { color: "#A2ACA3" },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: { width: "14.285714%" },
  day: { minHeight: 54, alignItems: "center", justifyContent: "center" },
  weekDay: { minHeight: 68 },
  dateCircle: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "transparent" },
  todayCircle: { backgroundColor: Colors.surfaceMuted, borderColor: "#C7DEC9" },
  selectedCircle: { backgroundColor: Colors.forestgreen, borderColor: Colors.forestgreen },
  date: { fontSize: 14, fontWeight: "600", color: Colors.textPrimary },
  outsideDate: { color: "#BEC7BF" },
  todayDate: { color: Colors.leafgreen, fontWeight: "800" },
  selectedDate: { color: "white", fontWeight: "800" },
  markers: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 3, height: 8, marginTop: 3 },
  eventDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: "#94B99B" },
  selectedEventDot: { backgroundColor: Colors.forestgreen },
  legend: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, paddingHorizontal: 4, paddingTop: 13, paddingBottom: 15 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendText: { fontSize: 10, color: Colors.textSecondary },
  selectedLabel: { fontSize: 10, color: Colors.textSecondary },
  summary: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#F5F8F3", borderRadius: 15, padding: 12 },
  summaryIcon: { width: 32, height: 32, borderRadius: 11, backgroundColor: "#E7EFE2", alignItems: "center", justifyContent: "center" },
  summaryContent: { flex: 1 },
  summaryTitle: { color: Colors.textPrimary, fontSize: 11, fontWeight: "600" },
  track: { height: 3, backgroundColor: "#DFE8DA", borderRadius: 3, marginTop: 8, overflow: "hidden" },
  fill: { height: "100%", backgroundColor: Colors.leafgreen, borderRadius: 3 },
  percent: { color: Colors.leafgreen, fontSize: 13, fontWeight: "800" },
});
