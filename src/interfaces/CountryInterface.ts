interface Name {
  common: string;
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface CountryInterface {
  name: Name;
  population: number;
  region: string;
  capital: string[];
  flags: Flags;
}
