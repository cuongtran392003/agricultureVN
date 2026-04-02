import { Colors } from "@/constant/Colors";
import { IMAGES } from "assets/images";
import { Text, TouchableOpacity, View } from "react-native";
import { CompactArticleCard } from "../common/CompactArticleCard";
import { FeaturedCard } from "../common/FeaturedCard";
import { ExpertChatButton } from "../common/ExpertChatButton";
import Animated, { FadeInUp } from "react-native-reanimated";

const sampleArticles = [
  {
    title: "Mô hình xen canh cà phê - Sầu riêng bền vững tại Đăk Lăk",
    time: "5 phút trước",
    image: IMAGES.imageLogin,
  },
  {
    title: "Nông dân Đắk Lắk áp dụng công nghệ mới, tăng năng suất cà phê",
    time: "10 phút trước",
    image: IMAGES.imageLogin,
  },
];

export const AgriNewsCard = () => {
  return (
    <View className="w-full gap-3 mt-4">
      {/* Section header */}
      <View className="flex-row justify-between items-center">
        <Text
          className="font-bold text-[20px]"
          style={{ color: Colors.forestgreen }}
        >
          Tin tức
        </Text>
        <TouchableOpacity>
          <Text className="text-[14px]" style={{ color: Colors.brownearth }}>
            Xem tất cả
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.View entering={FadeInUp.delay(500).springify().damping(15).stiffness(100)}>
        <FeaturedCard />
      </Animated.View>
      {sampleArticles.map((article, index) => (
        <Animated.View
          key={index}
          entering={FadeInUp.delay(600 + index * 100)
            .springify()
            .damping(15)
            .stiffness(100)}
        >
          <CompactArticleCard
            title={article.title}
            time={article.time}
            image={article.image}
          />
        </Animated.View>
      ))}
      <Animated.View entering={FadeInUp.delay(800).springify().damping(15).stiffness(100)}>
        <ExpertChatButton />
      </Animated.View>
    </View>
  );
};
