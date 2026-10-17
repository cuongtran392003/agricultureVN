import { Colors } from "@/constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps, ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";

type Props = { title: string; subtitle?: string; icon?: ComponentProps<typeof Ionicons>["name"]; onBack?: () => void; rightAction?: ReactNode };
export const AppHeader = ({ title, subtitle, icon = "leaf-outline", onBack, rightAction }: Props) => (
  <View style={styles.header}>
    {onBack ? <TouchableOpacity accessibilityRole="button" accessibilityLabel="Quay lại" onPress={onBack} style={styles.button}><Ionicons name="arrow-back" size={22} color={Colors.forestgreen} /></TouchableOpacity> : <View style={styles.button}><Ionicons name={icon} size={24} color={Colors.forestgreen} /></View>}
    <View style={styles.text}><Text style={styles.title} numberOfLines={2}>{title}</Text>{subtitle ? <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text> : null}</View>
    {rightAction}
  </View>
);
const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", gap: 14, paddingHorizontal: 20, paddingVertical: 20, backgroundColor: Colors.surface, borderBottomWidth: 1, borderColor: Colors.border },
  button: { width: 46, height: 46, borderRadius: 16, backgroundColor: Colors.surfaceMuted, alignItems: "center", justifyContent: "center" },
  text: { flex: 1, minWidth: 0 }, title: { fontSize: 23, fontWeight: "800", color: Colors.textPrimary }, subtitle: { fontSize: 12, color: Colors.textSecondary, marginTop: 5, lineHeight: 18 },
});
