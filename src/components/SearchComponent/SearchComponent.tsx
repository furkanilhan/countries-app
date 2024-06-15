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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchText(e.target.value);
  };

  return (
    <div className={`input-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="input-icon">
        <SearchOutlined />
      </div>
      <input
        value={search}
        onChange={handleSearch}
        className="custom-input"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};
