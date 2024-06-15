import { Routes, Route } from "react-router-dom";
import "./App.css";
import { CountryDetailComponent } from "./components/CountryDetailComponent/CountryDetailComponent";
import { HeaderComponent } from "./components/HeaderComponent/HeaderComponent";
import HomeComponent from "./components/HomeComponent/HomeComponent";

export const App = () => {
  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/country/:countryName" element={<CountryDetailComponent />} />
      </Routes>
    </>
  );
};
