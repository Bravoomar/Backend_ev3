import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Registro from '../pages/Registro';
import { describe, it, expect } from 'vitest';

describe('Página <Registro />', () => {
  it('debería mostrar formulario de registro', () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    const titulo = screen.getByText(/Crear Cuenta/i);
    expect(titulo).toBeInTheDocument();

    const campoNombre = screen.getByLabelText(/Nombre Completo/i);
    expect(campoNombre).toBeInTheDocument();

    const campoEmail = screen.getByLabelText(/Correo Electrónico/i);
    expect(campoEmail).toBeInTheDocument();

    const botonCrear = screen.getByText(/Crear Cuenta/i);
    expect(botonCrear).toBeInTheDocument();
  });
});