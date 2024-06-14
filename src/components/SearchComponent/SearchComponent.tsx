import { useEffect, useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const SearchComponent = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="search-container">
      <Input
        onChange={(e) => setSearch(e.target.value)}
        size="large"
        placeholder="Search for a country..."
        prefix={<SearchOutlined />}
      />
    </div>
  );
};
