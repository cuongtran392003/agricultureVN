import { Colors } from "@/constant/Colors";
import { ReactNode } from "react";
import { View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
export const FormSection = ({ step, title, description, children }: { step?: string; title: string; description?: string; children: ReactNode }) => <View style={{ backgroundColor: Colors.surface, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: Colors.border, marginBottom: 16 }}>
  <View style={{ flexDirection: "row", gap: 12, alignItems: "center", marginBottom: 20 }}>{step ? <View style={{ width: 32, height: 32, backgroundColor: Colors.surfaceMuted, borderRadius: 11, alignItems: "center", justifyContent: "center" }}><Text style={{ color: Colors.leafgreen, fontWeight: "800" }}>{step}</Text></View> : null}<View style={{ flex: 1 }}><Text style={{ fontSize: 18, fontWeight: "800", color: Colors.textPrimary }}>{title}</Text>{description ? <Text style={{ fontSize: 12, lineHeight: 18, color: Colors.textSecondary, marginTop: 4 }}>{description}</Text> : null}</View></View>
  {children}
</View>;
