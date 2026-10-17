import { Colors } from "@/constant/Colors";
import { Image, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
export const CurrentWeather = ({ data, temp, description }: { data: any; temp?: number | string; description?: string }) => {
  const value = Number(temp);
  const hasTemp = temp != null && Number.isFinite(value);
  const stats = [{ label: "Độ ẩm không khí", value: data?.main?.humidity != null ? `${data.main.humidity}%` : "—" }, { label: "Gió", value: data?.wind?.speed != null ? `${(data.wind.speed * 3.6).toFixed(1)} km/h` : "—" }, { label: "Tầm nhìn", value: data?.visibility != null ? `${(data.visibility / 1000).toFixed(1)} km` : "—" }];
  return <View style={{ margin: 20, padding: 24, backgroundColor: Colors.forestgreen, borderRadius: 28 }}>
    <Text style={{ color: "#C8DDCF", fontSize: 12, fontWeight: "700", letterSpacing: 1.3 }}>THỜI TIẾT HIỆN TẠI</Text>
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
      <View style={{ flex: 1 }}><Text style={{ color: "white", fontSize: 52, fontWeight: "800" }}>{hasTemp ? Math.round(value) : "—"}°</Text><Text style={{ color: "#C8DDCF", fontSize: 15, marginTop: 4 }}>{description || "Chưa có dữ liệu thời tiết"}</Text></View>
      {data?.weather?.[0]?.icon ? <Image source={{ uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png` }} style={{ width: 88, height: 88 }} /> : null}
    </View>
    <View style={{ flexDirection: "row", gap: 8, borderTopWidth: 1, borderTopColor: "#386650", paddingTop: 18, marginTop: 20 }}>{stats.map(item => <View key={item.label} style={{ flex: 1 }}><Text style={{ color: "white", fontSize: 14, fontWeight: "800" }}>{item.value}</Text><Text style={{ color: "#C8DDCF", fontSize: 10, marginTop: 6 }}>{item.label}</Text></View>)}</View>
  </View>;
};
