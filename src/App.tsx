import { useEffect, useState } from "react";
import "./App.css";
import { CurrencySelect } from "./components/СurrencySelect";
import {
  countryCurrency_getAll,
  currencyName_GetAll,
  currencyRate_GetAll,
} from "./features/currency/currency.service.ts";
import {
  ICountryCurrencyMap,
  ICurrency,
  ICurrencyMap,
  ICurrencyName_GetAll_Res_Dto,
  ICurrencyRate_GetAll_Res_Dto,
} from "./features/currency/currency.entity.ts";

import { CurrencyInfo } from "./components/CurrencyInfo";
import { InfoItem } from "./components/InfoItem";

const API_KEY = import.meta.env.VITE_API_KEY;
function App() {
  const [currencyRate_GetAll_Res, setCurrencyRate_GetAll_Res] =
    useState<ICurrencyRate_GetAll_Res_Dto>();
  const [currencyName_GetAll_Res, setCurrencyName_GetAll_Res] =
    useState<ICurrencyName_GetAll_Res_Dto>();
  const [countryCurrency_GetAll_Res, setCountryCurrency_GetAll_Res] =
    useState<ICountryCurrencyMap>({});

  const isSuccess = Boolean(
    currencyRate_GetAll_Res &&
      currencyName_GetAll_Res &&
      countryCurrency_GetAll_Res,
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [currentCurrencyCode, setCurrentCurrencyCode] = useState<string>("");

  //
  /* --- Загрузка исходных данных --- */

  // (1) Загрузка инфы о курсах валют
  useEffect(() => {
    // setCurrencyRate_GetAll_Res(currencyRates_GetAll_Res);
    handleFetch_CurrencyRate_GetAll();
  }, []);

  // (2) Загрузка названий валют
  useEffect(() => {
    // setCurrencyName_GetAll_Res(currencyNames_GetAll_Res);
    handleFetch_CurrencyName_GetAll();
  }, []);

  // (3) Загрузка связей страна/валюта
  useEffect(() => {
    handleFetch_countryCurrency_getAll();
  }, []);

  /* --- Загрузка исходных данных --- */
  //
  //
  /* --- Хэндлеры --- */
  function handleFetch_CurrencyRate_GetAll() {
    setIsError(false);
    setIsLoading(true);
    currencyRate_GetAll(API_KEY)
      .then((data) => setCurrencyRate_GetAll_Res(data))
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleFetch_CurrencyName_GetAll() {
    setIsError(false);
    setIsLoading(true);
    currencyName_GetAll(API_KEY)
      .then((data) => setCurrencyName_GetAll_Res(data))
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleFetch_countryCurrency_getAll() {
    setIsError(false);
    setIsLoading(true);
    countryCurrency_getAll()
      .then((response) => setCountryCurrency_GetAll_Res(response))
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRefresh() {
    handleFetch_CurrencyRate_GetAll();
    handleFetch_CurrencyName_GetAll();
    handleFetch_countryCurrency_getAll();
  }
  /* --- Хэндлеры --- */
  //

  //
  /* --- Вспомогательные переменные --- */
  let currencyCountryMap: { [key: string]: string } = {};
  let currencyMap: ICurrencyMap = {};
  let currencyArray: ICurrency[] = [];
  let infoActualDate: string = "";

  if (
    isSuccess &&
    currencyRate_GetAll_Res &&
    currencyName_GetAll_Res &&
    countryCurrency_GetAll_Res
  ) {
    currencyCountryMap = Object.keys(countryCurrency_GetAll_Res).reduce(
      (acc: { [prop: string]: string }, key: string) => {
        acc[countryCurrency_GetAll_Res[key]] = key;
        return acc;
      },
      {},
    );

    currencyMap = Object.keys(currencyRate_GetAll_Res.rates).reduce(
      (acc: ICurrencyMap, key: string) => {
        acc[key] = {
          currencyRate: currencyRate_GetAll_Res?.rates?.[key],
          currencyName: currencyName_GetAll_Res?.symbols?.[key],
          countryKey: currencyCountryMap?.[key],
        };
        return acc;
      },
      {},
    );

    currencyArray = Object.keys(currencyMap).map((key) => {
      return {
        currencyKey: key,
        currencyRate: currencyMap[key].currencyRate,
        currencyName: currencyMap[key].currencyName,
        countryKey: currencyMap[key].countryKey,
      };
    });

    infoActualDate =
      currencyRate_GetAll_Res?.date +
      " | " +
      new Date(currencyRate_GetAll_Res?.timestamp).toLocaleTimeString("ru-RU");
  }

  /* --- Вспомогательные переменные --- */
  //

  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.05)",
        boxShadow: "0 0 20px black",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        border: "solid 1px black",
        maxWidth: "1024px",
        minWidth: "300px",
        gap: "10px",
      }}
    >
      <button
        style={{ alignSelf: "end", boxShadow: "0 0 10px black" }}
        disabled={isLoading}
        onClick={handleRefresh}
      >
        {isLoading ? "Загрузка" : "Обновить"}
      </button>
      {isError ? (
        <b style={{ alignSelf: "end", color: "red" }}>
          {"Ошибка при загрузке"}
        </b>
      ) : null}
      <h1 style={{ marginTop: "15px", marginBottom: "15px" }}>
        {"КУРС ВАЛЮТ"}
      </h1>
      <InfoItem
        property={"Базовая валюта"}
        value={
          currencyMap?.[String(currencyRate_GetAll_Res?.base)]?.currencyName
        }
      />
      <InfoItem property={"Актуальность информации"} value={infoActualDate} />

      <CurrencySelect
        currencyArray={currencyArray}
        onChange={setCurrentCurrencyCode}
      />
      <CurrencyInfo currencyItemProps={currencyMap[currentCurrencyCode]} />
    </div>
  );
}

export default App;
