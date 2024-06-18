import { Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import "./App.css";
import styles from "./App.module.scss";
import { CountryDetailComponent } from "./components/CountryDetailComponent/CountryDetailComponent";

import { HeaderComponent } from "./components/HeaderComponent/HeaderComponent";
import { HomeComponent } from "./components/HomeComponent/HomeComponent";
export const App = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${styles.app} ${theme ? styles.darkTheme : styles.lightTheme} ${styles.primary}`}
    >
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/country/:countryName" element={<CountryDetailComponent />} />
      </Routes>
    </div>
  );
};
