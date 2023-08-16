import { useContext, useEffect, useState } from 'react';
import { PlanetsListContext } from '../Context/PlanetContext';
import { PlanetType } from '../types';

import './Table.css';

function Table() {
  const { planetsInfo } = useContext(PlanetsListContext);
  const colunaArray = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const operadorArray = ['maior que', 'menor que', 'igual a'];

  const [filteredPlanets, setFilteredPlanets] = useState<PlanetType[]>(planetsInfo);
  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedOperator, setSelectedOperator] = useState('maior que');
  const [selectedValue, setSelectedValue] = useState('0');
  const [filters, setFilters] = useState<{
    selectedColumn: string; selectedValue: string; selectedOperator: string; }[]>([]);

  const [filteredColumns, setFilteredColumns] = useState<string[]>([]);

  function filterPlanets(value: string) {
    const filteredPlanetsInfo = planetsInfo.filter((planet) => planet
      .name.toLowerCase().includes(value.toLowerCase()));
    setFilteredPlanets(filteredPlanetsInfo);
  }

  useEffect(() => {
    setFilteredPlanets(planetsInfo);
  }, [planetsInfo]);

  const filterColums = () => {
    const filtered = filteredPlanets.filter((planet:any) => { // como eu deveria tipar aqui
      const planetValue = parseFloat(planet[selectedColumn]);
      const filterValue = parseFloat(selectedValue);

      if (selectedOperator === 'maior que') {
        return planetValue > filterValue;
      } if (selectedOperator === 'menor que') {
        return planetValue < filterValue;
      }
      return planetValue === filterValue;
    });
    setFilters([...filters, {
      selectedColumn,
      selectedValue,
      selectedOperator,
    }]);

    setFilteredPlanets(filtered);

    if (!filteredColumns.includes(selectedColumn)) {
      setFilteredColumns([...filteredColumns, selectedColumn]);
    }
  };
  // const filterPlanetByFilters = (planet, myFilters) => {
  //   return myFilters.every((filter) => {
  //     const planetValue = parseFloat(planet[filter.selectedColumn]);
  //     const filterValue = parseFloat(filter.selectedValue);

  //     if (filter.selectedOperator === 'maior que') {
  //       return planetValue > filterValue;
  //     } if (filter.selectedOperator === 'menor que') {
  //       return planetValue < filterValue;
  //     }
  //     return planetValue === filterValue;
  //   });
  // };

  const renderFilters = () => {
    const removeFilter = (column: string) => {
      const newFilteredColumns = filteredColumns.filter((col) => col !== column);
      const newFiltersArray = filters.filter((col) => col.selectedColumn !== column);
      setFilters(newFiltersArray);
      setFilteredColumns(newFilteredColumns);

      if (newFilteredColumns.length === 0) {
        setFilteredPlanets(planetsInfo);
      } else {
        const restoredFilteredPlanets = planetsInfo.filter((planet) => {
          return newFilteredColumns.every((col) => applyFilter(planet, col));
        });

        setFilteredPlanets(restoredFilteredPlanets);
      }
    };
    const applyFilter = (planet: PlanetType, col: string) => {
      const myFilter = filters.find((filter) => filter.selectedColumn === col);

      if (!myFilter) {
        return true; // Mantém o planeta no filtro
      }

      const planetValue = parseFloat(planet[col]);
      const filterValue = parseFloat(myFilter.selectedValue);
      const filterOperator = myFilter.selectedOperator;

      if (filterOperator === 'maior que') {
        return planetValue > filterValue;
      } if (filterOperator === 'menor que') {
        return planetValue < filterValue;
      }
      return planetValue === filterValue;
    };

    const usedFilters = filters.map((filter, index) => (
      <div key={ index } data-testid="filter">

        {`${filter.selectedColumn} ${filter.selectedOperator} ${filter.selectedValue}`}

        <button
          type="button"
          onClick={ () => removeFilter(filter.selectedColumn) }
        >
          X
        </button>
      </div>
    ));
    return usedFilters;
  };

  const resetButton = () => {
    setFilteredPlanets(planetsInfo);
    setFilteredColumns([]);
    setSelectedColumn('population');
    setSelectedOperator('maior que');
    setSelectedValue('0');
    setFilters([]);
  };

  useEffect(() => {
    setSelectedColumn(
      (colunaArray
        .find((coluna) => !filteredColumns.includes(coluna))) ?? '',
    );
  }, [filteredColumns]);

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
        value={ selectedColumn }
      >
        { colunaArray.length === 0 ? null : colunaArray
          .filter((coluna) => !filteredColumns.includes(coluna)) // retorna true se a coluna não estiver no array
          .map((coluna, index) => ( // retorna um novo array com as colunas que não estão no array
            <option
              key={ index }
              value={ coluna }

            >
              {coluna}
            </option>
          )) }
      </select>
      <label htmlFor="comparison-filter">Operador</label>
      <select
        data-testid="comparison-filter"
        id="comparison-filter"
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
        data-testid="button-remove-filters"
        type="button"
        onClick={ resetButton }
      >
        Limpar Filtros
      </button>
      {renderFilters()}
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
