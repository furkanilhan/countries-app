import { ConfigProvider, Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./contexts/ThemeContext";
import { HeaderComponent } from "./components/HeaderComponent/HeaderComponent";
import { HomeComponent } from "./components/HomeComponent/HomeComponent";
import { CountryDetailComponent } from "./components/CountryDetailComponent/CountryDetailComponent";
import { themes } from "./themes";
import "./App.scss";

export const App = () => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? themes.dark : themes.light;

  return (
    <>
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
    </>
  );
};
