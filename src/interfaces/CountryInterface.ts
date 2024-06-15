interface Name {
  common: string;
  nativeName: {
    [key: string]: {
      common: string;
      official: string;
    };
  };
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}

interface Currencies {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

export interface CountryDetailInterface {
  name: Name;
  population: number;
  region: string;
  subregion: string;
  tld: string[];
  currencies: Currencies;
  languages: {
    [key: string]: string;
  };
  capital: string[];
  flags: Flags;
  borders: string[];
}

export interface CountryInterface {
  name: Name;
  population: number;
  region: string;
  capital: string[];
  flags: Flags;
}
