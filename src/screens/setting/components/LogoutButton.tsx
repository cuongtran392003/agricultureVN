import { Colors } from "@/constant/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <View className="px-[24px] mt-6 mb-4 items-center">
      {/* Logout button */}
      <TouchableOpacity
        onPress={onLogout}
        className="w-full flex-row items-center justify-center gap-2 py-[14px] rounded-[12px]"
        style={{
          backgroundColor: "#FFF0E6",
          borderWidth: 1,
          borderColor: Colors.brandorange,
        }}
      >
        <FontAwesome name="sign-out" size={20} color={Colors.brandorange} />
        <Text
          className="font-bold text-[16px]"
          style={{ color: Colors.brandorange }}
        >
          Đăng xuất
        </Text>
      </TouchableOpacity>

      {/* App version */}
      <Text
        className="text-[12px] mt-4 mb-2"
        style={{ color: Colors.softsoil }}
      >
        Phiên bản ứng dụng 2.4.1 (AgriTech)
      </Text>
    </View>
  );
};
