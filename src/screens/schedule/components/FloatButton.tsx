import { Button } from "@/components/ui/button"
import { Colors } from "@/constant/Colors"
import { FontAwesome } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import * as Haptics from 'expo-haptics';

export const FloatButton = () => {
    const router = useRouter();
    return (
        <Button
            className="rounded-full w-[60px] h-[60px] absolute bottom-6 right-6 z-10 items-center justify-center p-0"
            style={{ 
                backgroundColor: Colors.forestgreen,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 8,
            }}
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.navigate("/add-task" as any);
            }}
        >
            <FontAwesome className="mx-auto" name="plus" size={24} color="white" />
        </Button>
    )
}