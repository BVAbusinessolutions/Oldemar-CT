import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { RegistrationForm } from '../features/registration';
import { AdminPanel } from '../features/admin';

const pick = (label, option) => userEvent.selectOptions(screen.getByLabelText(label), option);

describe('Flujo completo: inscripción → panel admin', () => {
  it('muestra errores si se avanza vacío', async () => {
    render(<RegistrationForm />);
    await userEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
    expect(screen.getByText('Escribe tu nombre.')).toBeInTheDocument();
  });

  it('envía una inscripción y la muestra (con datos ocultos) en el panel', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<RegistrationForm />);

    await user.type(screen.getByLabelText('Nombre'), 'Carlos');
    await user.type(screen.getByLabelText('Apellidos'), 'Mora Solís');
    await user.type(screen.getByLabelText('Número de identificación'), '1-0234-0567');
    await user.type(screen.getByLabelText('Fecha de nacimiento'), '1990-05-10');
    await user.type(screen.getByLabelText('Teléfono'), '88887777');
    await user.type(screen.getByLabelText('Correo electrónico'), 'carlos@correo.com');
    await user.type(screen.getByLabelText('Contacto de emergencia'), 'Laura');
    await user.type(screen.getByLabelText('Teléfono de emergencia'), '88886666');
    await user.click(screen.getByRole('button', { name: 'Siguiente' }));

    await pick('¿Tienes permiso de portación?', 'no');
    await pick('Examen psicológico', 'pendiente');
    await pick('Examen teórico-práctico', 'no');
    await user.click(screen.getByRole('button', { name: 'Siguiente' }));

    await pick('Curso de interés', 'pistola-9mm');
    await pick('Experiencia previa', 'ninguna');
    await pick('Horario preferido', 'fin-semana');
    await user.click(screen.getByRole('button', { name: 'Siguiente' }));

    await user.upload(screen.getByLabelText(/Foto de la identificación/), new File(['img'], 'cedula.jpg', { type: 'image/jpeg' }));
    for (const box of screen.getAllByRole('checkbox')) await user.click(box);
    await user.click(screen.getByRole('button', { name: 'Enviar inscripción' }));

    expect(await screen.findByText('Inscripción recibida')).toBeInTheDocument();
    unmount();

    render(<MemoryRouter><AdminPanel /></MemoryRouter>);
    await user.click(await screen.findByRole('button', { name: 'Carlos Mora Solís' }));
    expect(screen.queryByText('1-0234-0567')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Mostrar datos sensibles' }));
    expect(screen.getByText('1-0234-0567')).toBeInTheDocument();
    expect(screen.getByText('cedula.jpg')).toBeInTheDocument();
  });
});
