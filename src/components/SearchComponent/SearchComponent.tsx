import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTheme } from "../../contexts/ThemeContext";

export const SearchComponent = ({
  search,
  handleSearchText,
}: {
  search: string;
  handleSearchText: (text: string) => void;
}) => {
  const { isDarkMode } = useTheme();
  const handleSearch = (text: string) => {
    handleSearchText(text);
  };

  return (
    <div className="search-container">
      <Input
        style={isDarkMode ? { background: "#26303b" } : { background: "white" }}
        className="search-input box-shadowed"
        variant="borderless"
        onChange={(e) => handleSearch(e.target.value)}
        value={search}
        size="large"
        placeholder="Search for a country..."
        prefix={<SearchOutlined style={isDarkMode ? { color: "white" } : { color: "#bbbbbb" }} />}
      />
    </div>
  );
};
