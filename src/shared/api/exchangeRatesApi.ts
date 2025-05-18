import axios from "axios";
import { RatesResponse } from "../entities/currency";

export const getLatestRates = async (): Promise<RatesResponse> => {
  const res = await axios.get("https://api.vatcomply.com/rates");
  return res.data;
};
