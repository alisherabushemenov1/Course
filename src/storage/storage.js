import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "favorites";
const USER_KEY = "user";

export async function saveUser(userObj) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(userObj));
}
export async function loadUser() {
  const raw = await AsyncStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}
export async function clearUser() {
  await AsyncStorage.removeItem(USER_KEY);
}

export async function loadFavorites() {
  const raw = await AsyncStorage.getItem(FAVORITES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveFavorites(favs) {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

export async function toggleFavorite(item) {
  const favs = await loadFavorites();
  const exists = favs.some((x) => x.id === item.id);
  const updated = exists ? favs.filter((x) => x.id !== item.id) : [item, ...favs];
  await saveFavorites(updated);
  return updated;
}
