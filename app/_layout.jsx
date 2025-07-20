import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import UserContextProvider from "../context/UserContextProvider";

export default function RootLayout() {
  useFonts({
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
  });
  return (
    <UserContextProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </UserContextProvider>
  );
}
