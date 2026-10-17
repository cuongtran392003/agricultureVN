import { Colors } from "@/constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";

export const ScheduleHeader = ({ onCreate }: { onCreate: () => void }) => (
  <View style={styles.header}>
    <View style={styles.brand}>
      <View style={styles.icon}><Ionicons name="calendar-outline" size={23} color={Colors.forestgreen} /></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Lịch trình</Text>
        <Text style={styles.subtitle}>Chăm vườn theo kế hoạch</Text>
      </View>
    </View>
    <TouchableOpacity onPress={onCreate} accessibilityRole="button" accessibilityLabel="Tạo công việc mới" style={styles.add}>
      <Ionicons name="add" size={22} color="white" />
      <Text style={styles.addText}>Tạo việc</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 18 },
  brand: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10 },
  icon: { width: 44, height: 44, borderRadius: 15, backgroundColor: Colors.surfaceMuted, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 25, fontWeight: "800", color: Colors.textPrimary },
  subtitle: { fontSize: 12, color: Colors.textSecondary, marginTop: 3 },
  add: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: Colors.forestgreen, paddingHorizontal: 12, minHeight: 44, borderRadius: 15 },
  addText: { fontSize: 13, fontWeight: "700", color: "white" },
});
