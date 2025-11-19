import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Carrito from '../pages/Carrito';
import { describe, it, expect, vi, afterEach } from 'vitest'; // <-- Importar afterEach y vi
import '@testing-library/jest-dom';

// MOCK: Crear un mock para useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate, // Sustituir useNavigate por nuestro mock
  };
});

// Datos de prueba: Carrito NO vacío para que el botón sea visible
const mockCarritoLleno = [
  { id: 1, nombre: "CPU Ryzen 5", precio: 100000, imagen: "/img/cpu.png" },
];

describe('Página <Carrito /> - Navegación', () => {

    // CORRECCIÓN: Usar afterEach. Si da error, confirma que 'afterEach'
    // está importado en la línea 6: import { describe, it, expect, vi, afterEach } from 'vitest';
    afterEach(() => {
        vi.clearAllMocks(); // Esto limpia las llamadas a mockNavigate después de cada 'it'
    });
    
    it('debería redirigir a /producto al hacer clic en "Seguir comprando"', async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter>
                <Carrito carrito={mockCarritoLleno} setCarrito={vi.fn()} />
            </MemoryRouter>
        );

        // 1. Encontrar el botón de navegación
        const botonSeguirComprando = screen.getByRole('button', { name: /Seguir comprando/i });

        // 2. Simular el click
        await user.click(botonSeguirComprando);

        // 3. Verificar que se llama a useNavigate con la ruta correcta
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/producto'); // Verifica la redirección a /producto
    });
});