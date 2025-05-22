import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { LoginForm } from '../types/forms';
import { loginSchema } from '../validations/schemas';
import { FormInput } from './FormInput';

export const LoginFormComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>Iniciar Sesión</h2>
      
      <FormInput
        label="Número de Cuenta"
        name="numeroCuenta"
        register={register}
        errors={errors}
        placeholder="Ingrese su número de cuenta"
      />

      <FormInput
        label="Contraseña"
        name="password"
        type="password"
        register={register}
        errors={errors}
        placeholder="Ingrese su contraseña"
      />

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}; 