import { Colors } from "@/constant/Colors";
import { useAuthStore } from "@/stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UpdateProfile from "./updateprofile";

export default function ProfileScreen() {
  const { user } = useAuthStore();
  const router = useRouter();

  const [visible, setVisible] = useState(false);

  const handleModalUpdate = () => {
    setVisible(true);
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "transparent" }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full bg-slate-100"
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={Colors.brownearth || "#1E1E1E"}
          />
        </TouchableOpacity>
        <Text
          className="text-[20px] font-bold"
          style={{ color: Colors.brownearth || "#1E1E1E" }}
        >
          Hồ sơ cá nhân
        </Text>
        <View className="w-10" />
      </View>

      <View className="flex-1 px-6">
        {/* Avatar Section */}
        <View className="items-center mt-6 mb-10">
          <View
            className="w-[100px] h-[100px] rounded-full items-center justify-center mb-4 shadow-sm"
            style={{ backgroundColor: Colors.leafgreen || "#22C55E" }}
          >
            <Text className="text-[40px] font-bold text-white uppercase">
              {user?.name?.charAt(0) || "U"}
            </Text>
          </View>
          <Text
            className="text-[24px] font-bold"
            style={{ color: Colors.brownearth || "#1E1E1E" }}
          >
            {user?.name}
          </Text>
          <Text className="text-[16px] text-gray-500 mt-1 capitalize">
            Vai trò: {user?.role || "Thành viên"}
          </Text>
        </View>

        {/* Info Fields */}
        <View className="gap-6">
          <InfoField
            label="Họ và tên"
            value={user?.name || ""}
            icon="person-outline"
          />
          <InfoField
            label="Địa chỉ Email"
            value={user?.email || ""}
            icon="mail-outline"
          />
          <InfoField
            label="Mã định danh (ID)"
            value={user?._id || ""}
            icon="finger-print-outline"
          />
        </View>
      </View>

      {/* Action Button */}
      <View className="px-6 py-6 pb-10">
        <TouchableOpacity
          onPress={handleModalUpdate}
          activeOpacity={0.8}
          className="w-full h-[56px] rounded-2xl items-center justify-center flex-row gap-2"
          style={{ backgroundColor: Colors.leafgreen || "#22C55E" }}
        >
          <Ionicons name="create-outline" size={20} color="white" />
          <Text className="text-white font-bold text-[16px]">
            Cập nhật thông tin
          </Text>
        </TouchableOpacity>
      </View>

      <UpdateProfile visible={visible} onClose={() => setVisible(false)} />
    </SafeAreaView>
  );
}

const InfoField = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: any;
}) => {
  return (
    <View>
      <Text className="text-[14px] text-gray-500 mb-2 font-medium">
        {label}
      </Text>
      <View className="w-full h-[56px] flex-row items-center px-4 rounded-xl border border-gray-200 bg-gray-50">
        <Ionicons name={icon} size={20} color={Colors.leafgreen || "#22C55E"} />
        <Text
          className="text-[16px] font-medium ml-3 flex-1"
          style={{ color: Colors.brownearth || "#1E1E1E" }}
          numberOfLines={1}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};
