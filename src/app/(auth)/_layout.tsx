import { Tabs } from "expo-router";


export default function AuthLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false
        }}>
            <Tabs.Screen name="login" options={{ title: "Login" }} />
            <Tabs.Screen name="register" options={{ title: "Register" }} />
        </Tabs>
    )
}