import { Card } from "antd";
import { Link } from "react-router-dom";
import { useDarkMode } from "./../../providers/DarkModeContext";
import { CountryInterface } from "../../interfaces/CountryInterface";

const { Meta } = Card;

export const CountryCardComponent: React.FC<{ country: CountryInterface }> = (props) => {
  const { darkMode } = useDarkMode();

  const cardStyle = darkMode
    ? {
        backgroundColor: "#26303b",
        color: "#fff",
      }
    : {
        backgroundColor: "#fff",
        color: "#000",
      };

  const titleStyle = darkMode
    ? {
        color: "#fff",
      }
    : {
        color: "#000",
      };

  return (
    <Link to={`/country/${props.country.name.common}`} style={{ textDecoration: "none" }}>
      <Card
        className="country-container"
        bordered={false}
        hoverable
        style={{ width: 240, ...cardStyle }}
        cover={
          <img
            alt={props.country.flags.alt}
            src={props.country.flags.png}
            style={{ height: "150px", objectFit: "cover" }}
          />
        }
      >
        <Meta title={<span style={titleStyle}>{props.country.name.common}</span>} />
        <Meta title="Population" description={props.country.population} />
        <Meta title="Region" description={props.country.region} />
        <Meta title="Capital" description={props.country.capital} />
      </Card>
    </Link>
  );
};
