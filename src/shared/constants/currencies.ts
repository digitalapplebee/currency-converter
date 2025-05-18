import currenciesData from "../../assets/currencies.json";

export interface Currency {
  name: string;
  symbol: string;
  symbolNative: string;
  decimalDigits: number;
  rounding: number;
  code: string;
  namePlural: string;
  countryCodeISO2: string;
  flagSrc: string;
}

export const currencies: Currency[] = currenciesData;
