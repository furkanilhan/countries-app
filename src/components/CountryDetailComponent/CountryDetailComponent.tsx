import { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Row, Col, Layout } from "antd";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { fetchCountryDataByName, fetchCountryDataByAlphaCode } from "../../services/apiService";
import "./CountryDetailComponent.scss";
import { CountryDetailInterface, CountryInterface } from "../../interfaces/CountryInterface";

const { Content } = Layout;

export const CountryDetailComponent = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState<CountryDetailInterface>();
  const [borderCountryNames, setBorderCountryNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!countryName) {
          throw new Error("Country name is not provided");
        }
        const loadedCountry = await fetchCountryDataByName(countryName);
        setCountry(loadedCountry);

        let borderCountryNames: string[] = [];
        if (loadedCountry.borders && loadedCountry.borders.length > 0) {
          borderCountryNames = await Promise.all(
            loadedCountry.borders.map(async (code) => {
              const countryData: CountryInterface = await fetchCountryDataByAlphaCode(code);
              return countryData.name.common;
            })
          );
        }
        setBorderCountryNames(borderCountryNames);
        setIsLoading(false);
      } catch (error: any) {
        setHttpError(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [countryName]);

  return (
    <Content>
      <div className="country-detail">
        <Link to="/">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            size="large"
            className="back-button box-shadowed"
            style={isDarkMode ? { background: "#26303b" } : { background: "white" }}
          >
            Back
          </Button>
        </Link>
        <Row gutter={24} className="country-info">
          <Col xs={24} md={12}>
            <img src={country?.flags.svg} alt={country?.flags.alt} className="country-flag" />
          </Col>
          <Col xs={24} md={12}>
            <div className="details-section">
              <h1>{country?.name.common}</h1>
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
            {borderCountryNames.length > 0 && (
              <div className="border-countries">
                <h4>Border Countries: </h4>
                <div className="border-country-buttons">
                  {borderCountryNames.map((name, index) => (
                    <Link key={index} to={`/country/${name}`}>
                      <Button
                        type="text"
                        className="border-country-button box-shadowed"
                        style={isDarkMode ? { background: "#26303b" } : { background: "white" }}
                      >
                        {name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </Content>
  );
};
