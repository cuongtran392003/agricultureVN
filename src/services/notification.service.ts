import axiosInstance from "@/libs/axiosInstance";
import notifee, { AndroidImportance } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Quyền thông báo:", authStatus);
    getFCMToken();
    return messaging().onTokenRefresh((token) => {
      console.log("Token refreshed:", token);
      updateTokenToServer(token);
    });
  }
}

const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
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
  if (!remoteMessage.notification) return;
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
    importance: AndroidImportance.HIGH,
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

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});
