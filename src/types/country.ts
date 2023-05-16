import { Region } from "./regions";

export type Currecy = {
  code: string;
  name: string;
  symbol: string;
};

export type Language = {
  name: string;
  nativeName: string;
};

export type Country = {
  name: string;
  nativeName: string;
  flag: string;
  flags: { png: string; svg: string };
  region: Region;
  subregion: string;
  capital: string;
  population: number;
  topLevelDomain: string[];
  borders: string[];
  currencies: Currecy[];
  languages: Language[];
};

type Info = {
  title: string;
  description: string;
};

export type CountryInfo = {
  img: string;
  name: string;
  info: Info[];
};
