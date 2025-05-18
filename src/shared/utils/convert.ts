export const convertCurrency = (
  amount: number,
  fromRate: number,
  toRate: number
) => {
  return (amount * toRate) / fromRate;
};
