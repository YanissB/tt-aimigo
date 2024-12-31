import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#E6B10A",
        tabBarInactiveTintColor: "#FFFFFF",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000000",
          height: 65,
          paddingBottom: 10,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Films",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favoris",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
