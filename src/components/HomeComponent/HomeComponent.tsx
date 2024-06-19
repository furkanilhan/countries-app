import { useEffect, useState } from "react";
import { CategoryComponent } from "../CategoryComponent/CategoryComponent";
import { CountryCardComponent } from "../CountryCardComponent/CountryCardComponent";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { CountryInterface } from "../../interfaces/CountryInterface";
import type { MenuProps } from "antd";
import "./HomeComponent.scss";

export const HomeComponent = () => {
  const [countries, setCountries] = useState<CountryInterface[]>([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [regions, setRegions] = useState<MenuProps["items"]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "https://restcountries.com/v3.1";
      let url: string = "";
      if (search == "" && region == "") {
        url = `${baseUrl}/all?fields=name,capital,population,region,flags`;
      } else if (search != "") {
        url = `${baseUrl}/name/${search}?fields=name,capital,population,region,flags`;
      } else if (region != "") {
        url = `${baseUrl}/region/${region}?fields=name,capital,population,region,flags`;
      }
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

      const regions = loadedCountries
        .sort((a, b) => a.region.localeCompare(b.region))
        .filter((item, index, array) => {
          return array.findIndex((t) => t.region === item.region) === index;
        })
        .map((item) => {
          return { key: item.region, label: item.region };
        });

      if (search == "" && region == "") setRegions(regions);
      setCountries(loadedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common)));
      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
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
    <>
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
          {countries.map((country) => (
            <CountryCardComponent country={country} />
          ))}
        </div>
      </div>
    </>
  );
};
