import React, { useEffect, useState } from "react";
import { useDarkMode } from "./../../providers/DarkModeContext";
import { CategoryComponent } from "../CategoryComponent/CategoryComponent";
import { CountryCardComponent } from "../CountryCardComponent/CountryCardComponent";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { CountryInterface } from "../../interfaces/CountryInterface";
import type { MenuProps } from "antd";
import "./HomeComponent.scss";

const HomeComponent = () => {
  const { darkMode } = useDarkMode();
  const [countries, setCountries] = useState<CountryInterface[]>([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [regions, setRegions] = useState<MenuProps["items"]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const baseUrl: string = "https://restcountries.com/v3.1";
      let url: string = "";

      if (search === "" && region === "") {
        url = `${baseUrl}/all?fields=name,capital,population,region,flags`;
      } else if (search !== "") {
        url = `${baseUrl}/name/${search}?fields=name,capital,population,region,flags`;
      } else if (region !== "") {
        url = `${baseUrl}/region/${region}?fields=name,capital,population,region,flags`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedCountries: CountryInterface[] = Object.values(responseData).map(
        (country: any) => ({
          name: country.name,
          population: country.population,
          region: country.region,
          capital: country.capital,
          flags: country.flags,
        })
      );

      const uniqueRegions = loadedCountries
        .map((country) => country.region)
        .filter((region, index, self) => self.indexOf(region) === index)
        .map((region) => ({ key: region, label: region }));

      setRegions(uniqueRegions);

      setCountries(loadedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common)));
      setIsLoading(false);
    };

    fetchCountries().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [search, region]);

  const handleSearchText = (search: string) => {
    setSearch(search);
  };

  const handleCategorySelect = (region: string) => {
    setSearch("");
    setRegion(region);
  };

  return (
    <div className={`home-container ${darkMode ? "darker-mode" : "light-mode"}`}>
      <div className="filter-container">
        <SearchComponent handleSearchText={handleSearchText} search={search} />
        <CategoryComponent
          handleCategorySelect={handleCategorySelect}
          region={region}
          regions={regions}
        />
      </div>
      <div className="grid-container">
        <div className="card-container">
          {countries.map((country, index) => (
            <CountryCardComponent key={index} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
