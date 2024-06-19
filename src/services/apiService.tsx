import { CountryDetailInterface, CountryInterface } from "../interfaces/CountryInterface";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const fetchData = async (search: string, region: string) => {
  let url: string;
  if (search === "" && region === "") {
    url = `${baseUrl}/all?fields=name,capital,population,region,flags`;
  } else if (search !== "") {
    url = `${baseUrl}/name/${search}?fields=name,capital,population,region,flags`;
  } else {
    url = `${baseUrl}/region/${region}?fields=name,capital,population,region,flags`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return await response.json();
};

// apiService.tsx

export const fetchCountryDataByName = async (
  countryName: string
): Promise<CountryDetailInterface> => {
  const url: string = `${baseUrl}/name/${countryName}?fields=name,capital,population,region,tld,subregion,flags,languages,currencies,borders`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const responseData: CountryDetailInterface[] = await response.json();
  return responseData[0];
};

export const fetchCountryDataByAlphaCode = async (alphaCode: string): Promise<CountryInterface> => {
  const url: string = `${baseUrl}/alpha/${alphaCode}?fields=name`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const responseData: CountryInterface = await response.json();
  return responseData;
};
