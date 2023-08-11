import React from 'react';
import './App.css';
import PlanetsProvider from './Context/PlanetsProvider';
import Table from './components/Table';

function App() {
  return (
    <PlanetsProvider>
      <span>Que a força esteja com vc!</span>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
