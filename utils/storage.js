import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Error storing data: ", error);
  }
};

export const getUserData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log("Error retrieving data: ", error);
  }
};
