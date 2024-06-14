import "./App.css";
import { HeaderComponent } from "./components/HeaderComponent/HeaderComponent";
import { HomeComponent } from "./components/HomeComponent/HomeComponent";
export const App = () => {
  return (
    <div>
      <HeaderComponent />
      <HomeComponent />
    </div>
  );
};
