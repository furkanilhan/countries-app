import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { useTheme } from "../../contexts/ThemeContext";

interface CategoryComponentProps {
  region: string;
  regions: MenuProps["items"];
  handleCategorySelect: (text: string) => void;
}

export const CategoryComponent: React.FC<CategoryComponentProps> = ({
  region,
  regions,
  handleCategorySelect,
}) => {
  const items: MenuProps["items"] = regions;
  const { isDarkMode } = useTheme();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    handleCategorySelect(e.key);
  };

  return (
    <div className="category-container">
      <Dropdown
        className="category-dropdown"
        menu={{
          items,
          onClick: handleMenuClick,
          selectable: true,
          selectedKeys: [region],
        }}
      >
        <Button
          type="text"
          className="box-shadowed"
          style={isDarkMode ? { background: "#26303b" } : { background: "white" }}
        >
          <Space>
            {region ? region : "Filter by Region"}
            {region && <CloseOutlined onClick={() => handleCategorySelect("")} />}
            {!region && <DownOutlined />}
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};
