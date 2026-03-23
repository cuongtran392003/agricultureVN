import { Button } from "@/components/ui/button"
import { Colors } from "@/constant/Colors"
import { FontAwesome } from "@expo/vector-icons"


export const FloatButton = () => {
    return (
        <Button
            className="rounded-full w-[60px] h-[60px] absolute bottom-10 right-10 z-10"
            style={{ backgroundColor: Colors.forestgreen }}
            onPress={() => console.log("FloatButton pressed")}
        >
            <FontAwesome className="mx-auto" name="plus" size={24} color="white" />
        </Button>
    )
}