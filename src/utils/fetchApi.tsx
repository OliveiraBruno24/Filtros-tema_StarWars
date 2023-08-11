const API_URL = 'https://swapi.dev/api/planets';

const PlanetsAPI = async () => {
  const result = await fetch(API_URL);
  const data = await result.json();
  return data;
};

export default PlanetsAPI;
