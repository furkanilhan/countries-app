import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";

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

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    handleCategorySelect(e.key);
  };

  return (
    <div className="category-container">
      <Dropdown
        menu={{
          items,
          onClick: handleMenuClick,
          selectable: true,
          selectedKeys: [region],
        }}
      >
        <Button>
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
