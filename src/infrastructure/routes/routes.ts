export const routes = {
  server_url: import.meta.env.VITE_API_URL_DEV,
  api: {
    countryCurrency: { getAll: "http://country.io/currency.json" },
    countryFlag: {
      getOne: (countryCode: string) =>
        `https://country.io/w320.${countryCode}.png`,
    },
    currencyRate: {
      getAll: (apiKey: string) =>
        `http://data.fixer.io/api/latest?access_key=${apiKey}`,
    },
    currencyName: {
      getAll: (apiKey: string) =>
        `http://data.fixer.io/api/symbols?access_key=${apiKey}`,
    },
  },
};
