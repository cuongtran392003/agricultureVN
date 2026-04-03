import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL_PRODUCTION;
// const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
// process.env.EXPO_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      return null;
    }
    const res = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
    const newAccessToken = res.data.data.token.accessToken;
    const newRefreshToken = res.data.data.token.refreshToken;

    await Promise.all([
      AsyncStorage.setItem("accessToken", newAccessToken),
      AsyncStorage.setItem("refreshToken", newRefreshToken),
    ]);
    return newAccessToken;
  } catch (error) {
    await Promise.all([
      AsyncStorage.removeItem("accessToken"),
      AsyncStorage.removeItem("refreshToken"),
    ]);
    return null;
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log(">> check token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu 401 (Unauthorized) và chưa retry → thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    // Log lỗi cho các trường hợp khác
    if (error.response) {
      console.error(
        `[API Error] ${error.response.status}:`,
        error.response.data,
      );
    } else if (error.request) {
      console.error("[API Error] Không nhận được phản hồi từ server");
    } else {
      console.error("[API Error]", error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
