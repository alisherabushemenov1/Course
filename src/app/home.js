import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { loadUser } from "../src/storage/storage";

const ITEMS = [
  { id: "1", title: "Meditation 1", desc: "Breathing practice" },
  { id: "2", title: "Meditation 2", desc: "Body scan" },
  { id: "3", title: "Meditation 3", desc: "Focus session" },
];

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("User");

  useEffect(() => {
    (async () => {
      const user = await loadUser();
      setUsername(user?.username || "User");
    })();
  }, []);

  return (
    <View style={{ padding: 16, gap: 10 }}>
      {/* ЛОГО в header части экрана (для скрина) */}
      <Text style={{ fontSize: 24, fontWeight: "800" }}>🧘 MyApp</Text>
      <Text style={{ fontSize: 16 }}>Welcome, {username}!</Text>

      <Pressable onPress={() => router.push("/settings-menu")} style={{ padding: 10, borderWidth: 1 }}>
        <Text>⚙️ Open Settings Menu</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/api")} style={{ padding: 10, borderWidth: 1 }}>
        <Text>🌍 Open API Screen</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/favorites")} style={{ padding: 10, borderWidth: 1 }}>
        <Text>⭐ Open Favorites</Text>
      </Pressable>

      <Text style={{ marginTop: 10, fontWeight: "700" }}>Items</Text>

      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push({ pathname: "/detail", params: { id: item.id, title: item.title, desc: item.desc } })}
            style={{ padding: 12, borderWidth: 1, marginBottom: 10 }}
          >
            <Text style={{ fontWeight: "700" }}>{item.title}</Text>
            <Text>{item.desc}</Text>
            <Text style={{ color: "blue" }}>Open Details →</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
