export type PlanetType = {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  films: string[],
  created: string,
  edited: string,
  url: string,
  residents?: string[]
};

export type PlanetsListType = {
  count: number,
  next:string,
  previous:null,
  results: PlanetType[]
};

export type PlanetContextTypes = {
  planetsInfo:PlanetType[]
};
