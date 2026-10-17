import { Colors } from "@/constant/Colors";
import { View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";

type Props = { id?: string; name?: string };

export const ProfileHeader = ({ id, name }: Props) => (
  <View style={{ flexDirection: "row", alignItems: "center", padding: 20, gap: 16 }}>
    <View style={{ width: 70, height: 70, borderRadius: 24, backgroundColor: Colors.forestgreen, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30, color: "white", fontWeight: "800" }}>{name?.trim().charAt(0).toUpperCase() || "U"}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 11, fontWeight: "700", letterSpacing: 1, color: Colors.leafgreen }}>HỒ SƠ NHÀ NÔNG</Text>
      <Text localize={!name} style={{ fontSize: 22, fontWeight: "800", color: Colors.textPrimary, marginTop: 5 }} numberOfLines={2}>{name || "Tài khoản của bạn"}</Text>
      {id ? <Text style={{ fontSize: 11, color: Colors.textSecondary, marginTop: 6 }} numberOfLines={1}>ID: {id}</Text> : null}
    </View>
  </View>
);
