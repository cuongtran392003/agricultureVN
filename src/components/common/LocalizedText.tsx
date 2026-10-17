import { translate, useLanguageStore } from "@/i18n";
import { Children, forwardRef } from "react";
import { Text, TextProps } from "react-native";

// Opt out for user-entered names, descriptions and messages.
export const LocalizedText = forwardRef<Text, TextProps & { localize?: boolean }>(
  function LocalizedText({ children, localize = true, accessibilityLabel, ...props }, ref) {
    const language = useLanguageStore(state => state.language);
    const content = localize
      ? typeof children === "string"
        ? translate(children, language)
        : Children.map(children, child => typeof child === "string" ? translate(child, language) : child)
      : children;
    return <Text {...props} ref={ref} accessibilityLabel={accessibilityLabel ? translate(accessibilityLabel, language) : undefined}>{content}</Text>;
  },
);
