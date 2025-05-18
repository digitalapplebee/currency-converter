import { useEffect, useState } from "react";
import { getLatestRates } from "../api/exchangeRatesApi";
import { getStoredRates, storeRates } from "../storage/ratesStorage";

export const useExchangeRates = (): [Record<string, number>, boolean] => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getLatestRates();
        setRates(data.rates);
        await storeRates(data);
      } catch {
        const cached = await getStoredRates();
        if (cached) setRates(cached.rates);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  return [rates, loading];
};
