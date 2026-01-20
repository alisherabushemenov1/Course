import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { fetchCountries } from "../src/api/api";

export default function ApiScreen() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (e) {
        console.error("Error fetching countries:", e?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>🌍 Countries (API)</Text>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 16 }} />
      ) : (
        <FlatList
          style={{ marginTop: 12 }}
          data={countries}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={{ padding: 12, borderWidth: 1, marginBottom: 10 }}>
              <Text style={{ fontWeight: "700" }}>{item.name}</Text>
              <Text>{item.region}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
