import { useState } from "react";
import { ConfigProvider, theme, Button, Card } from "antd";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { CountryDetailComponent } from "./components/CountryDetailComponent/CountryDetailComponent";

import { HeaderComponent } from "./components/HeaderComponent/HeaderComponent";
import { HomeComponent } from "./components/HomeComponent/HomeComponent";
export const App = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <HeaderComponent />
        <Button onClick={handleClick}>Change Theme to {isDarkMode ? "Light" : "Dark"}</Button>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/country/:countryName" element={<CountryDetailComponent />} />
        </Routes>
      </ConfigProvider>
    </>
  );
};
