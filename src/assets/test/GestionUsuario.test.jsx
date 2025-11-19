import { render, screen, waitFor, within } from '@testing-library/react'; // <-- Asegúrate que 'within' esté importado (aunque a veces es implícito)
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import GestionUsuario from '../pages/GestionUsuario';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Página <GestionUsuario /> - Lógica CRUD', () => {

    it('debería eliminar un usuario de la tabla y actualizar el DOM', async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter>
                <GestionUsuario />
            </MemoryRouter>
        );

        // Verificar el número inicial de usuarios
        let filasUsuarios = screen.getAllByRole('row').filter(row => row.querySelector('td'));
        expect(filasUsuarios).toHaveLength(2);

        // 1. Encontrar la fila de Ana García usando su RUN '22-2'
        const filaAna = screen.getByText('22-2').closest('tr'); 
        
        // 2. CORRECCIÓN: Usar within para buscar el botón de forma SCOPED y síncrona
        const botonEliminarAna = within(filaAna).getByRole('button', { 
            name: /Eliminar/i 
        });

        // 3. Simular el click para eliminar
        await user.click(botonEliminarAna);

        // 4. Verificar la desaparición de los elementos de Ana
        await waitFor(() => {
            // queryByText se usa para verificar que los elementos ya no existen
            expect(screen.queryByText('Ana')).not.toBeInTheDocument();
            expect(screen.queryByText('22-2')).not.toBeInTheDocument();
        });

        // 5. Verificación final de la cuenta de filas
        filasUsuarios = screen.getAllByRole('row').filter(row => row.querySelector('td'));
        expect(filasUsuarios).toHaveLength(1);
        expect(screen.getByText('Juan')).toBeInTheDocument();
    });
});