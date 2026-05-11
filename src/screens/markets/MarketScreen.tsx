import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/Skeleton";
import { Colors } from "@/constant/Colors";
import { getPriceService } from "@/services/service.price";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

import { formatDate, formatTime } from "@/utils/formatTimeDate";
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

  const dateTime = formatTime(new Date());
  const labelDate = formatDate(new Date());

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
      edges={["top"]}
      className="items-center"
      style={{ flex: 1, backgroundColor: "transparent" }}
    >
      <StatusBar
        style="dark"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={{ flex: 1 }}>
        <MarketHeader />
        {loading ? (
          <View className="flex-row flex-wrap justify-between px-4 pt-5 gap-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} width="48%" height={180} borderRadius={16} />
            ))}
          </View>
        ) : data.length === 0 && !refreshing ? (
          <EmptyState
            title="Thị trường đang nghỉ ngơi"
            description="Chưa có thông tin giá nông sản hôm nay. Hãy thử tải lại nhé."
            iconName="leaf"
            buttonText="Tải lại ngay"
            onAction={onRefresh}
          />
        ) : (
          <FlatList
            className="flex-1"
            data={data}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{
              paddingBottom: 16,
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
                <View className="w-full flex-row items-end justify-between mb-2 mt-2">
                  <Text
                    className="text-[18px] font-bold flex-1 mr-2"
                    style={{ color: Colors.forestgreen }}
                    numberOfLines={2}
                  >
                    Giá nông sản hôm nay
                  </Text>
                  <Text
                    className="text-[12px] text-right mb-[2px] flex-shrink-0"
                    style={{ color: Colors.brownearth }}
                  >
                    Cập nhật: {dateTime} {labelDate}
                  </Text>
                </View>
              </>
            }
            ListFooterComponent={<AgriNewsCard />}
            renderItem={({ item, index }) => (
              <View style={{ width: "48%" }}>
                <MarketPriceCard
                  name={item.name}
                  price={item.price}
                  change={item.change}
                  history={item.history || []}
                />
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
