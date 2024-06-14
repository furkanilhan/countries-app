import { useEffect, useState } from "react";
import { CategoryComponent } from "../CategoryComponent/CategoryComponent";
import { CountryCardComponent } from "../CountryCardComponent/CountryCardComponent";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { CountryInterface } from "../../interfaces/CountryInterface";
import "./HomeComponent.scss";

export const HomeComponent = () => {
  const [countries, setCountries] = useState<CountryInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "https://restcountries.com/v3.1/all";
      const url: string = `${baseUrl}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      const loadedCountries: CountryInterface[] = [];

      for (const key in responseData) {
        loadedCountries.push({
          name: responseData[key].name,
          population: responseData[key].population,
          region: responseData[key].region,
          capital: responseData[key].capital,
          flags: responseData[key].flags,
        });
      }

      setCountries(loadedCountries);
      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  return (
    <>
      <div className="filter-container">
        <SearchComponent />
        <CategoryComponent />
      </div>
      <div className="grid-container">
        <div className="card-container">
          {countries.map((country) => (
            <CountryCardComponent country={country} />
          ))}
        </div>
      </div>
    </>
  );
};
