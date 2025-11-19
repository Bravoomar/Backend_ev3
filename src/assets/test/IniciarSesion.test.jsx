import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import IniciarSesion from '../pages/IniciarSesion';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Página <IniciarSesion />', () => {
  it('debería mostrar formulario de inicio de sesión', () => {
    render(
      <MemoryRouter>
        <IniciarSesion />
      </MemoryRouter>
    );

    const titulo = screen.getByRole('heading', { name: /Iniciar Sesión/i });
    expect(titulo).toBeInTheDocument();

    const campoEmail = screen.getByLabelText(/Correo electrónico/i);
    expect(campoEmail).toBeInTheDocument();

    const campoPassword = screen.getByLabelText(/Contraseña/i);
    expect(campoPassword).toBeInTheDocument();

    const botonIniciar = screen.getByRole('button', { name: /Iniciar sesión/i });
    expect(botonIniciar).toBeInTheDocument();
  });
});