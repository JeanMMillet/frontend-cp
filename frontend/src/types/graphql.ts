export type NewCountryInput = {
  code: string;
  name: string;
  emoji: string;
  continent?: { id: number };
};

export type Country = {
  code: string;
  name: string;
  emoji: string;
  continent?: {
    name: string;
  };
};
export type Continent = {
  id: number;
  name: string;
};
