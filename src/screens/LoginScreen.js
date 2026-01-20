import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Login Error", "Invalid email or password");
      return;
    }

    navigation.navigate("Home");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <Button title="Login" onPress={handleLogin} />

      <Text onPress={() => navigation.navigate("Signup")}>
        Create account
      </Text>
    </View>
  );
}
