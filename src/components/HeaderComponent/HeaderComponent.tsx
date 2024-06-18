import "./HeaderComponent.scss";
import styles from "./../../App.module.scss";
import { MoonOutlined } from "@ant-design/icons";
import { useTheme } from "./../../context/ThemeContext";

export const HeaderComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header
      className={`page-header ${theme === "dark" ? styles.darkTheme : styles.lightTheme} ${
        styles.primary
      }`}
    >
      <div className="page-title">Where in the world?</div>
      <div className="page-theme" onClick={toggleTheme}>
        <MoonOutlined />
        <span>Dark Mode</span>
      </div>
    </header>
  );
};
