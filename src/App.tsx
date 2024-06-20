import React from "react";
import { ConfigProvider, Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./contexts/ThemeContext";
import { HeaderComponent } from "./components/HeaderComponent/HeaderComponent";
import { HomeComponent } from "./components/HomeComponent/HomeComponent";
import { CountryDetailComponent } from "./components/CountryDetailComponent/CountryDetailComponent";
import "./App.scss";

export const App = () => {
  const { theme } = useTheme();

  return (
    <ConfigProvider theme={{ token: theme, components: { Layout: theme } }}>
      <Layout className="main-layout">
        <HeaderComponent />
        <Layout className="body-layout">
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/country/:countryName" element={<CountryDetailComponent />} />
          </Routes>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
