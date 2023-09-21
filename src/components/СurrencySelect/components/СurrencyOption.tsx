import { ICurrency } from "../../../features/currency/currency.entity.ts";

interface IProps {
  currency: ICurrency;
}
export function CurrencyOption({ currency }: IProps) {
  return (
    <option value={currency.currencyKey}>
      {currency.currencyName}

      {" (" + currency.currencyKey + " " + currency.countryKey + ")"}
    </option>
  );
}
