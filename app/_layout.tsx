import { Provider } from "react-redux";
import { store } from "../store";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}
