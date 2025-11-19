import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'; // <-- Importar userEvent
import Producto from '../pages/Producto';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

// Datos de prueba (debe coincidir con productosData en Producto.jsx)
const MOCK_PRODUCTOS = [
  { id: 1, nombre: "Cpu Ryzen 5 5600g", precio: 109990, imagen: "/img/amd-5600g-1.png" },
  { id: 2, nombre: "Placa Madre B460M DS3H V2", precio: 136990, imagen: "/img/img.webp" },
];

describe('Página <Producto /> - Funcionalidad', () => {
  
  // MOCK: Spy para la función alert que se usa al agregar al carrito
  vi.spyOn(window, 'alert').mockImplementation(() => {}); 
  
  // MOCK: Función para simular el cambio de estado del carrito
  const setCarritoMock = vi.fn(); 
  
  // MOCK: Estado inicial del carrito
  const carritoInicial = [];


  it('debería filtrar productos correctamente al buscar', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Producto carrito={carritoInicial} setCarrito={setCarritoMock} />
      </MemoryRouter>
    );

    const buscador = screen.getByPlaceholderText(/Buscar producto/i);
    
    // Verificar que inicialmente se muestren 12 productos (basado en Producto.jsx)
    const botonesAgregar = screen.getAllByText(/Agregar al carrito/i);
    expect(botonesAgregar).toHaveLength(12);

    // 1. Simular la escritura de "Placa" en el buscador
    await user.type(buscador, 'Placa');

    // 2. Verificar que solo queden visibles los productos que contienen "Placa" (3 productos: 2, 9, 11)
    const productosVisibles = screen.getAllByText(/Agregar al carrito/i);
    expect(productosVisibles).toHaveLength(3); 
    expect(screen.getByText(/Placa Madre B460M DS3H V2/i)).toBeInTheDocument();
  });

  it('debería llamar a setCarrito al agregar un producto', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Producto carrito={carritoInicial} setCarrito={setCarritoMock} />
      </MemoryRouter>
    );

    // Encontrar el botón para agregar el primer producto (Cpu Ryzen 5 5600g)
    const botonAgregarRyzen = screen.getAllByRole('button', { name: /Agregar al carrito/i })[0];

    // 1. Simular el click
    await user.click(botonAgregarRyzen);

    // 2. Verificar que la prop setCarrito fue llamada con el nuevo producto
    expect(setCarritoMock).toHaveBeenCalledTimes(1);
    expect(setCarritoMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ nombre: 'Cpu Ryzen 5 5600g' })
      ])
    );
  });
});