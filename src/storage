import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFavorites = async (data) => {
  await AsyncStorage.setItem('favorites', JSON.stringify(data));
};

export const loadFavorites = async () => {
  const data = await AsyncStorage.getItem('favorites');
  return data ? JSON.parse(data) : [];
};
