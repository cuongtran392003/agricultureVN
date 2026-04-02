import { IMAGES } from "assets/images"
import { Image, View } from "react-native"


export const RegisterImage = () => {
    return (
        <View className="mt-4">
            <Image source={IMAGES.imageRegister} style={{resizeMode: "contain"}}/>
        </View>
    )
}