import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { saveUser } from "../src/storage/storage";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert("Signup Error", "All fields are required");
      return;
    }
    await saveUser({ username, email });
    Alert.alert("Success", "Account created");
    router.replace("/home");
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Sign Up</Text>

      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={{ borderWidth: 1, padding: 10 }} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 10 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, padding: 10 }} />

      <Pressable onPress={handleSignup} style={{ padding: 12, backgroundColor: "#222" }}>
        <Text style={{ color: "white", textAlign: "center" }}>Sign Up</Text>
      </Pressable>

      <Text onPress={() => router.push("/login")} style={{ color: "blue" }}>
        Already have an account? Login
      </Text>
    </View>
  );
}
