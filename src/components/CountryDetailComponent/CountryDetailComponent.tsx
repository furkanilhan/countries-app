import { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Row, Col } from "antd";
import { Link, useParams } from "react-router-dom";
import "./CountryDetailComponent.scss";
import { CountryDetailInterface, CountryInterface } from "../../interfaces/CountryInterface";

export const CountryDetailComponent = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState<CountryDetailInterface>();
  const [borderCountryNames, setBorderCountryNames] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "https://restcountries.com/v3.1";
      let url: string = `${baseUrl}/name/${countryName}?fields=name,capital,population,region,tld,subregion,flags,languages,currencies,borders`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData: CountryDetailInterface[] = await response.json();
      const loadedCountry: CountryDetailInterface = responseData[0];
      setCountry(loadedCountry);

      let borderCountryNames: string[] = [];
      if (loadedCountry.borders && loadedCountry.borders.length > 0) {
        borderCountryNames = await Promise.all(
          loadedCountry.borders.map(async (code) => {
            const res = await fetch(`${baseUrl}/alpha/${code}?fields=name`);
            const countryData: CountryInterface = await res.json();
            return countryData.name.common;
          })
        );
      }

      setBorderCountryNames(borderCountryNames);
      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [countryName]);

  return (
    <div className="country-detail">
      <Link to="/">
        <Button icon={<ArrowLeftOutlined />} size="large" className="back-button">
          Back
        </Button>
      </Link>
      <Row gutter={24} className="country-info">
        <Col xs={24} md={12}>
          <img src={country?.flags.svg} alt={country?.flags.alt} className="country-flag" />
        </Col>
        <Col xs={24} md={12}>
          <div className="details-section">
            <h2>{country?.name.common}</h2>
            <div className="details-columns">
              <div className="details-column">
                <p>
                  <strong>Native Name: </strong>
                  {country?.name && Object.values(country.name.nativeName)[0]?.common}
                </p>
                <p>
                  <strong>Population: </strong>
                  {country?.population.toLocaleString("en-US")}
                </p>
                <p>
                  <strong>Region: </strong>
                  {country?.region}
                </p>
                <p>
                  <strong>Sub Region: </strong>
                  {country?.subregion}
                </p>
                <p>
                  <strong>Capital: </strong>
                  {country?.capital.join(", ")}
                </p>
              </div>
              <div className="details-column">
                <p>
                  <strong>Top Level Domain: </strong> {country?.tld.join(", ")}
                </p>
                <p>
                  <strong>Currencies: </strong>
                  {country?.currencies &&
                    Object.values(country.currencies)
                      .map((currency) => currency.name)
                      .join(", ")}
                </p>
                <p>
                  <strong>Languages: </strong>
                  {country?.languages &&
                    Object.values(country.languages)
                      .map((language) => language)
                      .join(", ")}
                </p>
              </div>
            </div>
          </div>
          <div className="border-countries">
            <h3>Border Countries</h3>
            {borderCountryNames.map((name, index) => (
              <Link key={index} to={`/country/${name}`}>
                <Button type="default" className="border-country-button">
                  {name}
                </Button>
              </Link>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};
