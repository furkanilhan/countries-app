import { useEffect, useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { CountryInterface } from "../../interfaces/CountryInterface";

export const SearchComponent = ({
  search,
  handleSearchText,
}: {
  search: string;
  handleSearchText: (text: string) => void;
}) => {
  const [countries, setCountries] = useState<CountryInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const handleSearch = (text: string) => {
    handleSearchText(text);
  };

  return (
    <div className="search-container">
      <Input
        onChange={(e) => handleSearch(e.target.value)}
        value={search}
        size="large"
        placeholder="Search for a country..."
        prefix={<SearchOutlined />}
      />
    </div>
  );
};
