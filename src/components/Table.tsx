import { useContext, useEffect, useState } from 'react';
import { PlanetsListContext } from '../Context/PlanetContext';
import { PlanetType } from '../types';

import './Table.css';
import { any } from 'prop-types';

function Table() {
  const { planetsInfo } = useContext(PlanetsListContext);
  const colunaArray = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const operadorArray = ['maior que', 'menor que', 'igual a'];

  const [filteredPlanets, setFilteredPlanets] = useState<PlanetType[]>(planetsInfo);
  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedOperator, setSelectedOperator] = useState('maior que');
  const [selectedValue, setSelectedValue] = useState('0');

  function filterPlanets(value: string) {
    const filteredPlanetsInfo = planetsInfo.filter((planet) => planet
      .name.toLowerCase().includes(value.toLowerCase()));
    setFilteredPlanets(filteredPlanetsInfo);
  }

  useEffect(() => {
    setFilteredPlanets(planetsInfo);
  }, [planetsInfo]);

  const filterColums = () => {
    const filtered = planetsInfo.filter((planet) => {
      const planetValue = parseFloat(planet[selectedColumn]);
      console.log('planetValue', planetValue);
      const filterValue = parseFloat(selectedValue);

      if (selectedOperator === 'maior que') {
        return planetValue > filterValue;
      } if (selectedOperator === 'menor que') {
        return planetValue < filterValue;
      }
      return planetValue === filterValue;
    });
    setFilteredPlanets(filtered);
  };

  const resetButton = () => {
    setFilteredPlanets(planetsInfo);
  };

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (e) => filterPlanets(e.target.value) }
      />
      <label htmlFor="column-filter">Coluna</label>
      <select
        id="column-filter"
        data-testid="column-filter"
        onChange={ (e) => setSelectedColumn(e.target.value) }
      >
        { ...colunaArray.map((coluna, index) => (
          <option key={ index } value={ coluna }>
            {coluna}
          </option>
        )) }
      </select>
      <label htmlFor="comparison-filter">Operador</label>
      <select
        data-testid="comparison-filter"
        id="column-filter"
        onChange={ (e) => setSelectedOperator(e.target.value) }
      >
        { ...operadorArray.map((operador, index) => (
          <option key={ index } value={ operador }>
            {operador}
          </option>
        )) }
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ selectedValue }
        onChange={ (e) => setSelectedValue(e.target.value) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ filterColums }
      >
        Filtrar

      </button>
      <button
        type="button"
        onClick={ resetButton }
      >
        Limpar Filtros
      </button>
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
