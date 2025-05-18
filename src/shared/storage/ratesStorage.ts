import AsyncStorage from "@react-native-async-storage/async-storage";
import { RatesResponse } from "../entities/currency";
import { KEY } from "../constants/rates";

export const storeRates = async (data: RatesResponse) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
};

export const getStoredRates = async (): Promise<RatesResponse | null> => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
};
