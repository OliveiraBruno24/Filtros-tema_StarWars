import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste da aplicação toda', () => {
  it('Teste se renderiza o componente <App />', () => {
    render(<App />);
    const linkElement = screen.getByText(/Que a força esteja com vc!/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('Teste se renderiza os input de pesquisa', () => {
    render(<App />);
    const linkElement = screen.getByTestId('name-filter');
    expect(linkElement).toBeInTheDocument();
  });

  it('Teste se renderiza o seletor de filtro de coluna', () => {
    render(<App />);
    const linkElement = screen.getByTestId('column-filter');
    expect(linkElement).toBeInTheDocument();
  });

  it('Teste se renderiza o seletor de filtro de operador', () => {
    render(<App />);
    const linkElement = screen.getByTestId('comparison-filter');
    expect(linkElement).toBeInTheDocument();
  });

  it('Teste se renderiza uma caixa de texto que só aceita números', () => {
    render(<App />);
    const linkElement = screen.getByTestId('value-filter');
    expect(linkElement).toBeInTheDocument();
  });


  it('Teste se renderiza o seletor de filtro de coluna com as opções corretas', () => {
    render(<App />);
    const linkElement = screen.getByLabelText('Coluna');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveLength(5);
  });

  it('Teste se renderiza o seletor de filtro de operador com as opções corretas', () => {
    render(<App />);
    const linkElement = screen.getByLabelText('Operador');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveLength(3);
  });
});

describe('Testando eventos de usuários na aplicação', () => { 

  it('Teste se o botão de filtrar funciona', () => {
    render(<App />);
    const linkElement = screen.getByTestId('button-filter');
    expect(linkElement).toBeInTheDocument();
    userEvent.click(linkElement);
  }
  );

  it('Teste se o botão de resetar funciona', () => {
    render(<App />);
    const linkElement = screen.getByTestId('button-filter');
    expect(linkElement).toBeInTheDocument();
    userEvent.click(linkElement);
  }
  );

  it('Teste a funcionalidade de filtrar por nome', () => {
    render(<App />);
    const linkElement = screen.getByTestId('name-filter');
    expect(linkElement).toBeInTheDocument();
    userEvent.type(linkElement, 'Alderaan');
  }
  );

  it('Teste a funcionalidade de filtrar por coluna', () => {
    render(<App />);
    const linkElement = screen.getByTestId('column-filter');
    expect(linkElement).toBeInTheDocument();
    userEvent.selectOptions(linkElement, 'population');
  }
  );

  it('Teste a funcionalidade de filtrar por operador', () => {
    render(<App />);
    const linkElement = screen.getByTestId('comparison-filter');
    expect(linkElement).toBeInTheDocument();
    userEvent.selectOptions(linkElement, 'maior que');
  }
  );

  it('Teste a funcionalidade de filtrar por valor', () => {
    render(<App />);
    const linkElement = screen.getByTestId('value-filter');
    expect(linkElement).toBeInTheDocument();
    userEvent.type(linkElement, '100000');
  }
  );

  it('Teste a functionalidade de filtrar por coluna, operador e valor', () => {
    render(<App />);
    const columnOptions = screen.getByTestId('column-filter');
    expect(columnOptions).toBeInTheDocument();
    userEvent.selectOptions(columnOptions, 'orbital_period');
    const operatorOptions = screen.getByTestId('comparison-filter');
    expect(operatorOptions).toBeInTheDocument();
    userEvent.selectOptions(operatorOptions, 'igual a');
    const ValueInput = screen.getByTestId('value-filter');
    expect(ValueInput).toBeInTheDocument();
    userEvent.type(ValueInput, '304');
    const FilterButton = screen.getByTestId('button-filter');
    expect(FilterButton).toBeInTheDocument();
    userEvent.click(FilterButton);
    const tableInfo = screen.getByRole('table');
    expect(tableInfo).toBeInTheDocument();
    userEvent.click(FilterButton);

    //falta fazer o mock do fetch e verificar se a tabela foi renderizada com os dados corretos.
  }
  );

 })