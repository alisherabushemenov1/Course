import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert, Switch } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTIF_KEY = "notifications_enabled";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationsScreen() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(NOTIF_KEY);
      if (saved) setEnabled(saved === "true");
    })();
  }, []);

  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission", "Notifications permission not granted");
      return false;
    }
    return true;
  };

  const toggleEnabled = async () => {
    const next = !enabled;
    setEnabled(next);
    await AsyncStorage.setItem(NOTIF_KEY, String(next));
  };

  const testNotification = async () => {
    const ok = await requestPermission();
    if (!ok) return;

    await Notifications.scheduleNotificationAsync({
      content: { title: "Test Notification", body: "Your reminder is working ✅" },
      trigger: { seconds: 3 },
    });

    Alert.alert("Scheduled", "Test notification will appear in 3 seconds");
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>Notifications</Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text>Enable notifications</Text>
        <Switch value={enabled} onValueChange={toggleEnabled} />
      </View>

      <Pressable onPress={testNotification} style={{ padding: 12, borderWidth: 1 }}>
        <Text>Schedule test notification (3s)</Text>
      </Pressable>
    </View>
  );
}
