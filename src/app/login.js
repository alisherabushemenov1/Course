import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { loadUser } from "../src/storage/storage";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Login Error", "Email and password are required");
      return;
    }
    const user = await loadUser();
    if (!user || user.email !== email) {
      Alert.alert("Login Error", "User not found. Please sign up first.");
      return;
    }
    router.replace("/home");
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Login</Text>

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 10 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, padding: 10 }} />

      <Pressable onPress={handleLogin} style={{ padding: 12, backgroundColor: "#222" }}>
        <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
      </Pressable>

      <Text onPress={() => router.push("/signup")} style={{ color: "blue" }}>
        Don’t have an account? Sign up
      </Text>
    </View>
  );
}
