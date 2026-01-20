import React, { useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useFocusEffect } from "expo-router";
import { loadFavorites } from "../src/storage/storage";

export default function Favorites() {
  const [favs, setFavs] = useState([]);

  const load = async () => {
    const data = await loadFavorites();
    setFavs(data);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>⭐ Favorites</Text>

      {favs.length === 0 ? (
        <Text style={{ marginTop: 12 }}>No favorite items found</Text>
      ) : (
        <FlatList
          style={{ marginTop: 12 }}
          data={favs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ padding: 12, borderWidth: 1, marginBottom: 10 }}>
              <Text style={{ fontWeight: "700" }}>{item.title}</Text>
              <Text>{item.desc}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
