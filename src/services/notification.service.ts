import axiosInstance from "@/libs/axiosInstance";
import Constants, { ExecutionEnvironment } from "expo-constants";

const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

export const getFirebaseMessaging = () => {
  if (isExpoGo) return null;

  try {
    const firebaseMessaging = require("@react-native-firebase/messaging").default;
    return firebaseMessaging();
  } catch (error) {
    console.warn("Firebase Messaging is unavailable in this build.", error);
    return null;
  }
};

export async function requestUserPermission() {
  const messaging = getFirebaseMessaging();
  if (!messaging) return;

  const firebaseMessaging = require("@react-native-firebase/messaging").default;
  const authStatus = await messaging.requestPermission();
  const enabled =
    authStatus === firebaseMessaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === firebaseMessaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Quyền thông báo:", authStatus);
    void getFCMToken(messaging);
    return messaging.onTokenRefresh((token: string) => {
      console.log("Token refreshed:", token);
      updateTokenToServer(token);
    });
  }
}

const getFCMToken = async (messaging: NonNullable<ReturnType<typeof getFirebaseMessaging>>) => {
  try {
    const token = await messaging.getToken();
    if (token) {
      console.log("FCM Token của bạn là:", token);
      await updateTokenToServer(token);
    }
    // TODO: Gửi token này lên backend NestJS của bạn để lưu vào MongoDB
  } catch (error) {
    console.log("Lỗi lấy token:", error);
  }
};

export const onMessageReceived = async (remoteMessage: any) => {
  if (!remoteMessage.notification || isExpoGo) return;

  let notifee: typeof import("@notifee/react-native").default;
  let androidImportance: typeof import("@notifee/react-native").AndroidImportance;
  try {
    const notifeeModule = require("@notifee/react-native");
    notifee = notifeeModule.default;
    androidImportance = notifeeModule.AndroidImportance;
  } catch (error) {
    console.warn("Notifee is unavailable in this build.", error);
    return;
  }

  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
    importance: androidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    android: {
      channelId,
      smallIcon: "ic_launcher", // Đảm bảo icon này tồn tại
      pressAction: { id: "default" },
    },
  });
};

const updateTokenToServer = async (token: string) => {
  try {
    const res = await axiosInstance.patch("/users/update-fcm-token", {
      token,
    });
    return res.data;
  } catch (error) {
    console.log("Lỗi cập nhật token:", error);
  }
};

getFirebaseMessaging()?.setBackgroundMessageHandler(async (remoteMessage: any) => {
  console.log("Message handled in the background!", remoteMessage);
});
