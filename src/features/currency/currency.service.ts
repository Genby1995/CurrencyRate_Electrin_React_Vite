import { routes } from "../../infrastructure/routes";
import axios from "axios";
import {
  ICountryCurrencyMap,
  ICurrencyName_GetAll_Res_Dto,
  ICurrencyRate_GetAll_Res_Dto,
} from "./currency.entity.ts";

export async function countryCurrency_getAll(): Promise<ICountryCurrencyMap> {
  return axios.get(routes.api.countryCurrency.getAll).then((res) => res.data);
}

export async function currencyRate_GetAll(
  apiKey: string,
): Promise<ICurrencyRate_GetAll_Res_Dto> {
  return axios
    .get(routes.api.currencyRate.getAll(apiKey))
    .then((res) => res.data);
}

export async function countryFlag_GetOne(countryCode: string): Promise<File> {
  return await axios
    .get(routes.api.countryFlag.getOne(countryCode))
    .then((res) => res.data);
}

export async function currencyName_GetAll(
  apiKey: string,
): Promise<ICurrencyName_GetAll_Res_Dto> {
  return axios
    .get(routes.api.currencyName.getAll(apiKey))
    .then((res) => res.data);
}
