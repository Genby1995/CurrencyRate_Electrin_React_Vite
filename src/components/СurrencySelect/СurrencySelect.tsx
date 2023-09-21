import { ICurrency } from "../../features/currency/currency.entity.ts";
import { CurrencyOption } from "./components";

interface IProps {
  currencyArray: ICurrency[];
  onChange: (arg: string) => void;
}

export function CurrencySelect({ currencyArray, onChange }: IProps) {
  const isThereCountries = Boolean(
    currencyArray?.length && currencyArray?.length > 0,
  );
  const selectorPlaceholder = isThereCountries
    ? "Выберете валюту:"
    : "Валюты не получены!";
  const isSelectorDisabled = !isThereCountries;

  function handleChangeSelector(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    onChange(value);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "5px",
        border: "1px solid grey",
        borderRadius: "10px",
      }}
    >
      <span style={{ textAlign: "start" }}>{selectorPlaceholder}</span>
      <select
        inputMode={"text"}
        spellCheck={true}
        placeholder={selectorPlaceholder}
        disabled={isSelectorDisabled}
        onChange={handleChangeSelector}
      >
        {currencyArray.map((item, index) => {
          return <CurrencyOption key={index} currency={item} />;
        })}
      </select>
    </div>
  );
}
