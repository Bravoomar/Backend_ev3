import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/header';
import { describe, it, expect } from 'vitest';

describe('Componente <Header />', () => {
  it('debería mostrar logo y navegación', () => {
    render(
      <MemoryRouter>
        <Header carrito={[]} />
      </MemoryRouter>
    );

    const logo = screen.getByAltText(/Logo de MiTienda/i);
    expect(logo).toBeInTheDocument();

    const titulo = screen.getByText(/PC Store/i);
    expect(titulo).toBeInTheDocument();

    const enlaceInicio = screen.getByText(/Inicio/i);
    expect(enlaceInicio).toBeInTheDocument();

    const enlaceProductos = screen.getByText(/Productos/i);
    expect(enlaceProductos).toBeInTheDocument();
  });
});