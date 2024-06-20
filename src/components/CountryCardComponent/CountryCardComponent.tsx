import { Card } from "antd";
import { Link } from "react-router-dom";
import { CountryInterface } from "../../interfaces/CountryInterface";

export const CountryCardComponent: React.FC<{ country: CountryInterface }> = (props) => {
  return (
    <Link to={`/country/${props.country.name.common}`}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={props.country.flags.png} height={160} />}
      >
        <div className="card-info">
          <h3>{props.country.name.common}</h3>
          <p>
            <strong>Population: </strong>
            {props.country.population.toLocaleString("en-US")}
          </p>
          <p>
            <strong>Region: </strong>
            {props.country.region}
          </p>
          <p>
            <strong>Capital: </strong>
            {props.country.capital}
          </p>
        </div>
      </Card>
    </Link>
  );
};
