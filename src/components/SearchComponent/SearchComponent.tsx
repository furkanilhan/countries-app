import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDarkMode } from "./../../providers/DarkModeContext";

export const SearchComponent = ({
  search,
  handleSearchText,
}: {
  search: string;
  handleSearchText: (text: string) => void;
}) => {
  const { darkMode } = useDarkMode();

  const inputStyle = darkMode
    ? { backgroundColor: "#26303b", color: "#fff", border: "none" }
    : { backgroundColor: "#f9f9f9", color: "#000", border: "none" };

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
        style={inputStyle}
        prefix={<SearchOutlined style={inputStyle} />}
      />
    </div>
  );
};
