import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!username || !email || !password) {
      Alert.alert("Signup Error", "All fields are required");
      return;
    }

    Alert.alert("Success", "Account created successfully");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Sign Up</Text>

      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <Button title="Sign Up" onPress={handleSignup} />

      <Text onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
      </Text>
    </View>
  );
}
