import { useEffect, useState } from "react";
import { CategoryComponent } from "../CategoryComponent/CategoryComponent";
import { CountryCardComponent } from "../CountryCardComponent/CountryCardComponent";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { CountryInterface } from "../../interfaces/CountryInterface";
import { MenuProps, Layout, Spin, message, Empty } from "antd";
import { fetchData } from "../../services/apiService";
import "./HomeComponent.scss";

const { Content } = Layout;

export const HomeComponent = () => {
  const [countries, setCountries] = useState<CountryInterface[]>([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [regions, setRegions] = useState<MenuProps["items"]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchBooks = async () => {
      const responseData = await fetchData(search, region);
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

      if (search === "" && region === "") setRegions(regions);
      setCountries(loadedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common)));
      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
      console.log(error);
      messageApi.open({
        type: "error",
        content: error.message,
      });
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
    <Content>
      {contextHolder}
      {isLoading ? (
        <Spin spinning={isLoading} percent="auto" fullscreen />
      ) : (
        <div className="page-container">
          <div className="filter-container">
            <SearchComponent handleSearchText={handleSearchText} search={search} />
            <CategoryComponent
              handleCategorySelect={handleCategorySelect}
              region={region}
              regions={regions}
            />
          </div>
          <div className="grid-container">
            {countries.length > 0 ? (
              <div className="card-container">
                {countries.map((country, index) => (
                  <CountryCardComponent key={index} country={country} />
                ))}
              </div>
            ) : (
              <div className="empty-container">
                <Empty />
              </div>
            )}
          </div>
        </div>
      )}
    </Content>
  );
};
