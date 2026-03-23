import { Colors } from "@/constant/Colors";
import { getPriceService } from "@/services/service.price";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AgriNewsCard } from "./components/AgriNewsCard";
import { MarketHeader } from "./components/MarketHeader";
import { MarketPriceCard } from "./components/MarketPriceCard";

interface PriceItems {
  id: string;
  name: string;
  price: string;
  change: string;
  history: number[];
}

export const MarketScreen = () => {
  const [data, setData] = useState<PriceItems[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getPrices = async () => {
    try {
      setLoading(true);
      setRefreshing(true);
      const res = await getPriceService();
      setData(res);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu từ MockAPI:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getPrices();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getPrices();
    setRefreshing(false);
  };
  return (
    <SafeAreaView
      className="items-center"
      style={{ flex: 1, backgroundColor: Colors.lightyellow }}
    >
      <StatusBar style="dark" backgroundColor={Colors.offwhite} />
      <View style={{ backgroundColor: Colors.lightyellow }}>
        <MarketHeader />
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={"large"} color={Colors.forestgreen} />
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{
              paddingBottom: 20,
              paddingHorizontal: 16,
              paddingTop: 20,
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors.forestgreen]}
                tintColor={Colors.forestgreen}
              />
            }
            ListHeaderComponent={
              <>
                <View className="w-full flex-row items-center justify-between">
                  <Text
                    className="text-[18px] font-bold"
                    style={{ color: Colors.forestgreen }}
                  >
                    Giá nông sản hôm nay
                  </Text>
                  <Text
                    className="text-[14px] w-[100px]"
                    style={{ color: Colors.brownearth }}
                  >
                    Cập nhật: 9:30, 24/05/2026
                  </Text>
                </View>
              </>
            }
            ListFooterComponent={<AgriNewsCard />}
            renderItem={({ item }) => (
              <MarketPriceCard
                name={item.name}
                price={item.price}
                change={item.change}
                history={item.history || []}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
