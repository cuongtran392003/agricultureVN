import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export const SettingScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F0EDE8' }}>
            <View>
                <Text>SettingScreen</Text>
            </View>
        </SafeAreaView>
    )
}