const API_KEY = "sandbox_c94178aad3icjtmcaafg";
const API_URL = "https://finnhub.io/api/v1";
const API_URL_SEARCH = `${API_URL}/search?token=${API_KEY}`;
const API_URL_CANDLE = `${API_URL}/stock/candle?token=${API_KEY}`;
const TIMESTAMP = Math.round(Date.now() / 1000);
const TIMESTAMP_PAST = Math.round(new Date(2022, 0, 0).getTime() / 1000);

export async function getCompanies(query = "") {
  if(query.trim().length === 0) return [];

  let data;

  try {
    let response = await fetch(`${API_URL_SEARCH}&q=${query}`);
    response = await response.json();

    data = response.result;
  } catch(error) {
    console.log("===GET COMPANIES ERROR===", error);
    return [];
  }

  return data;
}

export async function getQuotes(symbol = "", from = TIMESTAMP_PAST, to = TIMESTAMP, resolution = "W") {
  if(symbol.trim().length === 0) return [];

  let data;

  try {
    let response = await fetch(`${API_URL_CANDLE}&symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`);
    response = await response.json();

    data = response.s === "ok" ? response.c : [];
  } catch(error) {
    console.log("===GET QUOTES ERROR===", error);
    return [];
  }

  console.log(data);

  return data;
}