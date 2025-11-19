import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contacto from '../pages/Contacto';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Página <Contacto />', () => {
  it('debería mostrar información de contacto', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    const titulo = screen.getByText(/Contacto y Ayuda/i);
    expect(titulo).toBeInTheDocument();

    const faq = screen.getByText(/Preguntas Frecuentes/i);
    expect(faq).toBeInTheDocument();

    const formulario = screen.getByText(/Envía tus dudas/i);
    expect(formulario).toBeInTheDocument();

    const botonEnviar = screen.getByText(/Enviar Mensaje/i);
    expect(botonEnviar).toBeInTheDocument();
  });
});