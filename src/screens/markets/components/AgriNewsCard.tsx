import { Colors } from "@/constant/Colors";
import { IMAGES } from "assets/images";
import { Text, TouchableOpacity, View } from "react-native";
import { CompactArticleCard } from "../common/CompactArticleCard";
import { FeaturedCard } from "../common/FeaturedCard";
import { ExpertChatButton } from "../common/ExpertChatButton";

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

      <FeaturedCard />
      {sampleArticles.map((article, index) => (
        <CompactArticleCard
          key={index}
          title={article.title}
          time={article.time}
          image={article.image}
        />
      ))}
      <ExpertChatButton/>
    </View>
  );
};
