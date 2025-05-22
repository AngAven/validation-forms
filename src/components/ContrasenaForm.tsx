import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ContrasenaForm } from '../types/forms';
import { contrasenaSchema } from '../validations/schemas';
import { FormInput } from './FormInput';

export const ContrasenaFormComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContrasenaForm>({
    resolver: zodResolver(contrasenaSchema),
  });

  const onSubmit = (data: ContrasenaForm) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>Cambiar Contraseña</h2>
        <p>
            Tu contraseña debe tener al menos 12 caracteres, incluir letras, números y símbolos.
            Evita utilizar información personal,
            como el nombre de tu negocio o números consecutivos.
        </p>
      
      <FormInput
        label="Contraseña Actual"
        name="contrasena"
        type="password"
        register={register}
        errors={errors}
        placeholder="Ingrese su contraseña actual"
      />

      <FormInput
        label="Nueva Contraseña"
        name="nuevaContrasena"
        type="password"
        register={register}
        errors={errors}
        placeholder="Ingrese su nueva contraseña"
      />

      <FormInput
        label="Confirmar Contraseña"
        name="confirmarContrasena"
        type="password"
        register={register}
        errors={errors}
        placeholder="Confirme su nueva contraseña"
      />

      <button type="submit">Cambiar Contraseña</button>
    </form>
  );
}; 