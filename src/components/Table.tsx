import { useContext, useEffect, useState } from 'react';
import { PlanetsListContext } from '../Context/PlanetContext';
import { PlanetType } from '../types';

function Table() {
  const { planetsInfo } = useContext(PlanetsListContext);

  const [filteredPlanets, setFilteredPlanets] = useState<PlanetType[]>(planetsInfo);

  function filterPlanets(value: string) {
    const filteredPlanetsInfo = planetsInfo.filter((planet) => planet
      .name.toLowerCase().includes(value.toLowerCase()));
    setFilteredPlanets(filteredPlanetsInfo);
  }

  useEffect(() => {
    setFilteredPlanets(planetsInfo);
  }, [planetsInfo]);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (e) => filterPlanets(e.target.value) }
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}
export default Table;
