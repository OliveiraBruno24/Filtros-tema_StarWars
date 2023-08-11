import { useEffect, useState } from 'react';
import { PlanetType, PlanetsListType } from '../types';
import PlanetsAPI from '../utils/fetchApi';
import { PlanetsListContext } from './PlanetContext';

type PlanetsProviderType = {
  children:React.ReactNode
};

function PlanetsProvider({ children }: PlanetsProviderType) {
  const [planetsInfo, setPlanetsInfo] = useState<PlanetType[]>([]); // PlanetsInfo está recebendo tudo da API exceto residents. Como esperado.

  useEffect(() => {
    const getPlanetsInfo = async () => {
      const data = await PlanetsAPI();
      const planetsWithoutResidents = removeResidents(data);
      setPlanetsInfo(planetsWithoutResidents.results);
    };
    getPlanetsInfo();
  }, []);

  const contextValue = { planetsInfo };
  return (
    <PlanetsListContext.Provider value={ contextValue }>
      {children}
    </PlanetsListContext.Provider>
  );

  function removeResidents(planets: PlanetsListType): PlanetsListType {
    const planetsWithoutResidents = planets.results.map((planet) => {
      const { residents, ...planetWithoutResidents } = planet;
      return planetWithoutResidents;
    });
    return {
      ...planets,
      results: planetsWithoutResidents,
    };
  }
}

export default PlanetsProvider;
