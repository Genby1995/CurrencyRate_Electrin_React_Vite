export interface ICountryCurrencyMap {
  [countryKey: string]: string;
}

export interface ICurrency {
  countryKey: string;
  currencyKey: string;
  currencyName: string;
  currencyRate: number;
}

export interface ICurrencyProps {
  countryKey: string;
  currencyName: string;
  currencyRate: number;
}

export interface ICurrencyMap {
  [key: string]: ICurrencyProps;
}

export interface ICurrencyRateMap {
  [currency: string]: number;
}

export interface ICurrencyNameMap {
  [currency: string]: string;
}

export interface ICurrencyName_GetAll_Res_Dto {
  success: boolean;
  symbols: ICurrencyNameMap;
}
export interface ICurrencyRate_GetAll_Res_Dto {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: ICurrencyRateMap;
}
