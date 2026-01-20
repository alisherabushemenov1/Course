import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function SettingsMenu() {
  const router = useRouter();

  const settings = [
    { title: "Theme", route: "/settings" },
    { title: "Notifications", route: "/notifications" },
    { title: "Profile / Favorites", route: "/favorites" },
  ];

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>⚙️ Settings Menu</Text>

      {settings.map((s) => (
        <Pressable
          key={s.title}
          onPress={() => router.push(s.route)}
          style={{ padding: 12, borderWidth: 1 }}
        >
          <Text>{s.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}
