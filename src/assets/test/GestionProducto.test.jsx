import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GestionProducto from '../pages/GestionProducto';
import { describe, it, expect } from 'vitest';

describe('Página <GestionProducto />', () => {
  it('debería mostrar formulario y tabla de productos', () => {
    render(
      <MemoryRouter>
        <GestionProducto />
      </MemoryRouter>
    );

    const tituloFormulario = screen.getByText(/Agregar \/ Editar Producto/i);
    expect(tituloFormulario).toBeInTheDocument();

    const campoNombre = screen.getByLabelText(/Nombre/i);
    expect(campoNombre).toBeInTheDocument();

    const campoPrecio = screen.getByLabelText(/Precio/i);
    expect(campoPrecio).toBeInTheDocument();

    const tituloTabla = screen.getByText(/Listado de Productos/i);
    expect(tituloTabla).toBeInTheDocument();

    const botonGuardar = screen.getByText(/Guardar Producto/i);
    expect(botonGuardar).toBeInTheDocument();
  });
});