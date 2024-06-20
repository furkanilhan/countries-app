import React from "react";
import "./HeaderComponent.scss";
import { Layout } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTheme } from "../../contexts/ThemeContext";
const { Header } = Layout;

export const HeaderComponent = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <Header className="header-container">
      <div className="page-header">
        <div className="page-title">Where in the world?</div>
        <div className="page-theme" onClick={toggleTheme}>
          {isDarkMode ? (
            <>
              <SunOutlined />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <MoonOutlined />
              <span>Dark Mode</span>
            </>
          )}
        </div>
      </div>
    </Header>
  );
};
