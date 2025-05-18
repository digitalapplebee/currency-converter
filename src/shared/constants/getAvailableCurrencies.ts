import allCurrencies from "../../assets/currencies.json";

export const getAvailableCurrencies = (rates: Record<string, number>) => {
  const availableCodes = Object.keys(rates);
  return allCurrencies.filter((currency) =>
    availableCodes.includes(currency.code)
  );
};
