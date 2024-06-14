import "./HeaderComponent.scss";
import { Layout } from "antd";
import { MoonOutlined } from "@ant-design/icons";
const { Header } = Layout;

export const HeaderComponent = () => {
  return (
    <Header className="page-header">
      <div className="page-title">Where in the world?</div>
      <div className="page-theme">
        <MoonOutlined />
        <span>Dark Mode</span>
      </div>
    </Header>
  );
};
