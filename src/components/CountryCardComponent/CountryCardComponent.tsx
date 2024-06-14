import { Card } from "antd";
import { CountryInterface } from "../../interfaces/CountryInterface";

const { Meta } = Card;

export const CountryCardComponent: React.FC<{ country: CountryInterface }> = (props) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={props.country.flags.png} />}
    >
      <Meta title={props.country.name.common} />
      <Meta title="Population" description={props.country.population} />
      <Meta title="Region" description={props.country.region} />
      <Meta title="Capital" description={props.country.capital} />
    </Card>
  );
};
