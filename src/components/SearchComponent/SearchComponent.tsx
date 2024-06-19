import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./../../App.module.scss";
import { useTheme } from "./../../context/ThemeContext";
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
  const { theme } = useTheme();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchText(e.target.value);
  };

  const iconStyle = {
    color: theme ? "#ffffff" : "#898989",
  };

  return (
    <div
      className={`input-container ${theme ? styles.darkTheme : styles.lightTheme} ${
        styles.primary
      }`}
      style={iconStyle}
    >
      <div className="input-icon">
        <SearchOutlined />
      </div>
      <input
        value={search}
        onChange={handleSearch}
        className={`custom-input ${theme ? styles.darkTheme : styles.lightTheme} ${
          styles.secondary
        }`}
        type="text"
        placeholder="Search for a country..."
      />
    </div>
  );
};
