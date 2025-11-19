import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nosotros from '../pages/Nosotros';
import { describe, it, expect } from 'vitest';

describe('Página <Nosotros />', () => {
  it('debería mostrar información sobre la empresa', () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>
    );

    const titulo = screen.getByText(/Nosotros/i);
    expect(titulo).toBeInTheDocument();

    const bienvenida = screen.getByText(/Bienvenido a PC STORE/i);
    expect(bienvenida).toBeInTheDocument();

    const equipo = screen.getByRole('heading', { name: /Nuestro Equipo/i });
    expect(equipo).toBeInTheDocument();

    const miembroEquipo = screen.getByText(/Juan Pérez/i);
    expect(miembroEquipo).toBeInTheDocument();
  });
});