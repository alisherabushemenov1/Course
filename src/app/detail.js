import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { toggleFavorite } from "../src/storage/storage";

const Tabs = ["About", "Instructions"];

export default function Detail() {
  const params = useGlobalSearchParams();
  const { id, title, desc } = params;

  const [activeTab, setActiveTab] = useState("About");

  const item = { id: String(id), title: String(title), desc: String(desc) };

  const onToggleFav = async () => {
    await toggleFavorite(item);
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>{title}</Text>

      {/* Tabs */}
      <View style={{ flexDirection: "row", gap: 10 }}>
        {Tabs.map((t) => (
          <Pressable key={t} onPress={() => setActiveTab(t)} style={{ padding: 8, borderWidth: 1 }}>
            <Text>{t}</Text>
          </Pressable>
        ))}
      </View>

      {activeTab === "About" ? (
        <Text>About: {desc}</Text>
      ) : (
        <Text>Instructions: Do 5 minutes slowly and breathe.</Text>
      )}

      <Pressable onPress={onToggleFav} style={{ padding: 12, borderWidth: 1 }}>
        <Text>⭐ Add/Remove Favorite</Text>
      </Pressable>
    </View>
  );
}
