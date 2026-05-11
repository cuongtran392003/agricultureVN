import { GlobalBackground } from "@/components/GlobalBackground";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import {
  onMessageReceived,
  requestUserPermission,
} from "@/services/notification.service";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/nunito";
import messaging from "@react-native-firebase/messaging";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text, TextInput } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
SplashScreen.preventAutoHideAsync();

// Apply Global Font Trick
interface TextWithDefaultProps extends React.FC<any> {
  defaultProps?: any;
}
(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps.style = {
  fontFamily: "Nunito_600SemiBold",
};
(TextInput as unknown as TextWithDefaultProps).defaultProps =
  (TextInput as unknown as TextWithDefaultProps).defaultProps || {};
(TextInput as unknown as TextWithDefaultProps).defaultProps.style = {
  fontFamily: "Nunito_600SemiBold",
};

const queryClient = new QueryClient();
export default function RootLayout() {
  const [loaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const router = useRouter();

  useEffect(() => {
    requestUserPermission();

    // 1. Khi đang mở App
    const unsubscribe = messaging().onMessage(onMessageReceived);

    // 2. Khi nhấn vào thông báo từ trạng thái Background (App đang ẩn)
    const unsubscribeOpened = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        console.log(
          "Notification caused app to open from background:",
          remoteMessage.data,
        );
        if (remoteMessage.data?.screen) {
          router.push(remoteMessage.data.screen as any);
        }
      },
    );

    // 3. Khi nhấn vào thông báo từ trạng thái Quit (App tắt hẳn)
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.data,
          );
          if (remoteMessage.data?.screen) {
            // Dùng setTimeout để đảm bảo router đã sẵn sàng
            setTimeout(
              () => router.push(remoteMessage.data?.screen as any),
              500,
            );
          }
        }
      });

    return () => {
      unsubscribe();
      unsubscribeOpened();
    };
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <SafeAreaProvider>
          <GlobalBackground />
          <StatusBar
            style="dark"
            backgroundColor="transparent"
            translucent={true}
          />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
              contentStyle: { backgroundColor: "transparent" },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="chat" />
            <Stack.Screen name="weather" />
            <Stack.Screen name="register" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SafeAreaProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
