import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Inicio from '../pages/Inicio';
import { describe, it, expect } from 'vitest';

describe('Página <Inicio />', () => {
  it('debería mostrar titulo y botones', () => {
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    );

    const titulo = screen.getByText(/TIENDA ONLINE PC STORE/i);
    expect(titulo).toBeInTheDocument();

    const botones = screen.getAllByText(/Ver productos/i);
    expect(botones.length).toBeGreaterThan(0);

    fireEvent.click(botones[0]);
  });
});
