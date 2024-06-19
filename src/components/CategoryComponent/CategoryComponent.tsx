import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import styles from "./../../App.module.scss";
import "./CategoryComponent.scss";
import { useTheme } from "./../../context/ThemeContext";
import { useState } from "react";

interface CategoryComponentProps {
  region: string;
  regions: string[];
  handleCategorySelect: (text: string) => void;
}

export const CategoryComponent: React.FC<CategoryComponentProps> = ({
  region,
  regions,
  handleCategorySelect,
}) => {
  const { theme } = useTheme();

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const region = event.target.value;
    setSelectedRegion(region);
    handleCategorySelect(region);
  };

  return (
    <div className="category-container">
      <div className={styles.filterByRegion}>
        <select
          id="region"
          value={selectedRegion || ""}
          onChange={handleRegionChange}
          className={`select-container ${styles.secondary} ${
            theme ? styles.darkTheme : styles.lightTheme
          }`}
        >
          <option value="" disabled hidden>
            Filter by region
          </option>
          {regions.map((region, index) => (
            <option
              key={index}
              value={region}
              className={`${styles.secondary} ${theme ? styles.darkTheme : styles.lightTheme}`}
            >
              {region}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
