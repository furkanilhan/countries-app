import "./HeaderComponent.scss";
import styles from "./../../App.module.scss";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTheme } from "./../../context/ThemeContext";

export const HeaderComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header
      className={`page-header ${theme ? styles.darkTheme : styles.lightTheme} ${styles.secondary}`}
    >
      <div className="page-title">Where in the world?</div>
      <div onClick={toggleTheme} className="page-theme">
        {theme ? (
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
    </header>
  );
};
