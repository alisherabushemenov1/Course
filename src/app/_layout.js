import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { loadUser } from "../src/storage/storage";

export default function Layout() {
  const [initialRouteName, setInitialRouteName] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await loadUser();
      setInitialRouteName(user ? "home" : "login");
    })();
  }, []);

  if (!initialRouteName) return null;

  return (
    <Stack initialRouteName={initialRouteName} screenOptions={{ headerShown: true }} />
  );
}
