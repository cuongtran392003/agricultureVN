import { Colors } from "@/constant/Colors";
import { useTranslation } from "@/i18n";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps, useState } from "react";
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";

type Props = TextInputProps & { label: string; error?: string | string[]; hint?: string; required?: boolean; icon?: ComponentProps<typeof Ionicons>["name"] };
export const FormField = ({ label, error, hint, required, icon, secureTextEntry, style, ...props }: Props) => {
  const { t } = useTranslation();
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const messages = (Array.isArray(error) ? error : error ? [error] : []).filter(Boolean);
  return <View style={styles.field}>
    <Text style={styles.label}>{label}{required ? <Text style={{ color: Colors.error }}> *</Text> : null}</Text>
    <View style={[styles.inputBox, { alignItems: props.multiline ? "flex-start" : "center", borderColor: messages.length ? Colors.error : focused ? Colors.leafgreen : Colors.border, backgroundColor: focused ? Colors.surface : Colors.offwhite }]}>
      {icon ? <Ionicons name={icon} size={20} color={focused ? Colors.leafgreen : Colors.textSecondary} style={{ marginTop: props.multiline ? 15 : 0 }} /> : null}
      <TextInput {...props} placeholder={props.placeholder ? t(props.placeholder) : undefined} accessibilityLabel={t(props.accessibilityLabel || label)} secureTextEntry={secureTextEntry && !visible} placeholderTextColor={Colors.textSecondary} style={[styles.input, props.multiline && { minHeight: 108, textAlignVertical: "top" }, style]} onFocus={(event) => { setFocused(true); props.onFocus?.(event); }} onBlur={(event) => { setFocused(false); props.onBlur?.(event); }} />
      {secureTextEntry ? (
        <Pressable
          cssInterop={false}
          accessibilityRole="button"
          accessibilityLabel={t(visible ? "Ẩn mật khẩu" : "Hiện mật khẩu")}
          onPress={() => setVisible(current => !current)}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? Colors.surfaceMuted : "transparent",
          })}
        >
          <Ionicons name={visible ? "eye-off-outline" : "eye-outline"} size={22} color={Colors.forestgreen} />
        </Pressable>
      ) : null}
    </View>
    {messages.length ? <View accessibilityLiveRegion="polite">
      {messages.map((message, index) => <Text key={`${index}-${message}`} style={[styles.hint, { color: Colors.error }]}>{messages.length > 1 ? "• " : ""}{message}</Text>)}
    </View> : hint ? <Text style={styles.hint}>{hint}</Text> : null}
  </View>;
};
const styles = StyleSheet.create({ field: { marginBottom: 18 }, label: { fontSize: 14, fontWeight: "700", color: Colors.textPrimary, marginBottom: 9 }, inputBox: { flexDirection: "row", alignItems: "center", borderWidth: 1.5, borderRadius: 16, paddingHorizontal: 14 }, input: { flex: 1, minWidth: 0, paddingVertical: 16, fontSize: 16, color: Colors.textPrimary }, hint: { fontSize: 12, lineHeight: 18, marginTop: 7, color: Colors.textSecondary } });
