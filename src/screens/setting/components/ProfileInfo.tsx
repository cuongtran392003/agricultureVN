import { Colors } from "@/constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
export const ProfileInfo = ({ name, onPress }: { name?: string; onPress: () => void }) => <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
  <Text style={{ color: Colors.textPrimary, fontWeight: "800", fontSize: 18, marginBottom: 12 }}>Thông tin cá nhân</Text>
  <TouchableOpacity accessibilityRole="button" onPress={onPress} style={{ flexDirection: "row", alignItems: "center", gap: 14, padding: 20, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: 24 }}>
    <View style={{ width: 44, height: 44, borderRadius: 15, backgroundColor: Colors.surfaceMuted, alignItems: "center", justifyContent: "center" }}><Ionicons name="person-outline" size={22} color={Colors.leafgreen} /></View>
    <View style={{ flex: 1 }}><Text style={{ fontSize: 16, fontWeight: "700", color: Colors.textPrimary }}>Hồ sơ của bạn</Text><Text localize={!name} style={{ color: Colors.textSecondary, fontSize: 12, marginTop: 5 }}>{name || "Xem và cập nhật thông tin"}</Text></View>
    <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
  </TouchableOpacity>
</View>;
