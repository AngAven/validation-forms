import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import type {TarjetaForm} from '../types/forms';
import {tarjetaSchema} from '../validations/schemas';
import {FormInput} from './FormInput';

export const TarjetaFormComponent: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<TarjetaForm>({
        // @ts-expect-error
        resolver: zodResolver(tarjetaSchema),
    });

    const onSubmit = (data: TarjetaForm) => {
        console.log(data);
        // Handle form submission
    };


    return (
        // @ts-expect-error
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <h2>Información de Tarjeta</h2>

            <FormInput
                label="Nombre en la Tarjeta"
                name="nombre"
                register={register}
                errors={errors}
                placeholder="Nombre como aparece en la tarjeta"
            />

            <FormInput
                label="Número de Tarjeta"
                name="numeroTarjeta"
                register={register}
                errors={errors}
                placeholder="1234 5678 9012 3456"
            />

            <div className="form-row">
                <FormInput
                    label="Mes"
                    name="mes"
                    register={register}
                    errors={errors}
                    placeholder="MM"
                />

                <FormInput
                    label="Año"
                    name="anio"
                    register={register}
                    errors={errors}
                    placeholder="YY"
                />

                <FormInput
                    label="CVV"
                    name="cvv"
                    type="password"
                    register={register}
                    errors={errors}
                    placeholder="123"
                />
            </div>

            <button type="submit">Guardar Tarjeta</button>
        </form>
    );
}; 