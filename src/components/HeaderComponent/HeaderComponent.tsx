import "./HeaderComponent.scss";
import { Layout } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useDarkMode } from "./../../providers/DarkModeContext";
const { Header } = Layout;

export const HeaderComponent: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <Header className={`page-header ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="page-title">Where in the world?</div>
      <div onClick={toggleDarkMode} className="page-theme">
        {darkMode ? (
          <>
            <SunOutlined /> <span>Light Mode</span>
          </>
        ) : (
          <>
            <MoonOutlined />
            <span>Dark Mode</span>
          </>
        )}
      </div>
    </Header>
  );
};
