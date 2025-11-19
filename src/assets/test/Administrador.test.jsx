// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Administrador from '../pages/Administrador';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Página <Administrador />', () => {
  it('debería mostrar opciones de administración', () => {
    render(
      <MemoryRouter>
        <Administrador />
      </MemoryRouter>
    );

    const titulo = screen.getByText(/Selecciona qué gestionar/i);
    expect(titulo).toBeInTheDocument();

    const botonUsuarios = screen.getByText(/Gestionar Usuarios/i);
    expect(botonUsuarios).toBeInTheDocument();

    const botonProductos = screen.getByText(/Gestionar Productos/i);
    expect(botonProductos).toBeInTheDocument();
  });
});