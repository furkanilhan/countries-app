import { ConfigProvider, Layout } from "antd";

import { Routes, Route } from "react-router-dom";
import { useTheme } from "./contexts/ThemeContext";
import "./App.css";
import { CountryDetailComponent } from "./components/CountryDetailComponent/CountryDetailComponent";

import { HeaderComponent } from "./components/HeaderComponent/HeaderComponent";
import { HomeComponent } from "./components/HomeComponent/HomeComponent";

export const App = () => {
  const { isDarkMode } = useTheme();

  const lightTheme = {
    colorBgBase: "white",
    colorPrimary: "black",
    colorTextBase: "black",
    bodyBg: "#f9f9f9",
    headerBg: "white",
    headerColor: "black",
    colorBgContainer: "white",
    colorBgElevated: "white",
    colorBgTextActive: "red",
    defaultActiveBg: "red",
  };
  const darkTheme = {
    colorBgBase: "#1d282f",
    colorPrimary: "white",
    colorTextBase: "white",
    bodyBg: "#1d282f",
    headerBg: "#26303b",
    headerColor: "white",
    colorBgContainer: "#26303b",
    colorBgElevated: "#26303b",
    colorTextQuaternary: "white",
  };

  return (
    <>
      <ConfigProvider
        theme={{
          token: isDarkMode ? darkTheme : lightTheme,
          components: {
            Layout: isDarkMode ? darkTheme : lightTheme,
            Button: isDarkMode ? darkTheme : lightTheme,
          },
        }}
      >
        <Layout style={{ minHeight: "100vh" }}>
          <HeaderComponent />
          <Layout style={{ padding: "0 50px" }}>
            <Routes>
              <Route path="/" element={<HomeComponent />} />
              <Route path="/country/:countryName" element={<CountryDetailComponent />} />
            </Routes>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};
