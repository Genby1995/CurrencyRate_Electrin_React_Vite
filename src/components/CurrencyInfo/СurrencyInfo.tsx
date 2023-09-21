import { ICurrencyProps } from "../../features/currency/currency.entity.ts";
import { constructFlagUrl } from "../../utils/helpers/bytesToMbString.ts";
import placeholder from "../../assets/placeholder.png";
import placeholder_loading from "../../assets/loading_placeholder.jpg";
import { InfoItem } from "../InfoItem";

interface IProps {
  currencyItemProps: ICurrencyProps;
}

export function CurrencyInfo({ currencyItemProps }: IProps) {
  const imgSrc = currencyItemProps?.countryKey
    ? constructFlagUrl(currencyItemProps?.countryKey)
    : placeholder;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 style={{ marginTop: "10px", marginBottom: "10px" }}>
        {currencyItemProps?.currencyName ?? "Название валюты"}
      </h2>
      <InfoItem
        property={"Курс базовой валюты к выбранной"}
        value={currencyItemProps?.currencyRate}
      />

      <img
        alt={"Флаг страны-владелицы валюты"}
        src={imgSrc}
        style={{
          maxWidth: "100%",
          maxHeight: "320px",
          boxShadow: "0 0 10px black",
          borderRadius: "20px",
        }}
        placeholder={placeholder_loading}
      />
    </div>
  );
}
