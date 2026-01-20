import React, { useEffect, useState } from "react";
import { View, Text, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "theme";

export default function Settings() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(THEME_KEY);
      if (saved) setTheme(saved);
    })();
  }, []);

  const toggleTheme = async () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    await AsyncStorage.setItem(THEME_KEY, next);
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>Settings</Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text>Dark Mode</Text>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      </View>

      <Text>Current theme: {theme}</Text>
    </View>
  );
}
