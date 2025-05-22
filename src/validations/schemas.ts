import {z} from 'zod';
import { validateCreditCardWithLuhn } from './utils';

export const loginSchema = z.object({
    numeroCuenta: z.string()
        .min(1, 'El número de cuenta es requerido')
        .regex(/^\d+$/, 'El número de cuenta debe contener solo números')
        .refine(val => !val.includes(' '), 'El número de cuenta no debe contener espacios'),
    password: z.string()
        .min(12, 'La contraseña debe tener al menos 12 caracteres')
        .max(30, 'La contraseña no puede tener más de 30 caracteres')
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, 'La contraseña debe incluir letras, números y símbolos')
        .refine(val => !val.includes(' '), 'La contraseña no debe contener espacios'),
});

export const tarjetaSchema = z.object({
    nombre: z.string()
        .min(1, 'El nombre es requerido'),
    numeroTarjeta: z.string()
        .min(1, 'El número de tarjeta es requerido')
        .refine((val) => !val || validateCreditCardWithLuhn(val), 'El número de tarjeta no es válido según el algoritmo Luhn'),
    mes: z.string()
        .min(1, 'El mes es requerido')
        .refine((val) => !val || /^([1-9]|0[1-9]|1[0-2])$/.test(val), 'El mes debe estar entre 1 y 12')
        .refine((val) => !val || !val.includes(' '), 'El mes no debe contener espacios'),
    anio: z.string()
        .min(1, 'El año es requerido')
        .refine((val) => !val || /^\d{2}$|^\d{4}$/.test(val), 'El año debe tener 2 o 4 dígitos')
        .refine((val) => !val || !val.includes(' '), 'El año no debe contener espacios'),
    cvv: z.string()
        .min(3, 'El CVV debe tener 3 dígitos')
        .max(4, 'El CVV debe tener máximo 4 dígitos')
        .regex(/^\d+$/, 'El CVV debe contener solo números')
        .refine(val => !val.includes(' '), 'El CVV no debe contener espacios'),
}).superRefine((data, ctx) => {
    // Validate that the card expiration date is not in the past
    if (data.mes && data.anio) {
        const currentDate = new Date();
        const currentFullYear = currentDate.getFullYear();
        const currentYear = currentFullYear % 100; // Get last 2 digits of current year
        const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11

        const cardYear = parseInt(data.anio, 10);
        const cardMonth = parseInt(data.mes, 10);

        // Check if the card is expired based on year length
        let isExpired = false;

        if (data.anio.length === 2) {
            // For 2-digit years, compare with current 2-digit year
            isExpired = cardYear < currentYear || (cardYear === currentYear && cardMonth < currentMonth);
        } else {
            // For 4-digit years, compare with full current year
            isExpired = cardYear < currentFullYear || (cardYear === currentFullYear && cardMonth < currentMonth);
        }

        if (isExpired) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'La fecha de expiración de la tarjeta no puede ser en el pasado',
                path: ['mes'],
            });
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'La fecha de expiración de la tarjeta no puede ser en el pasado',
                path: ['anio'],
            });
        }
    }
});

export const contrasenaSchema = z.object({
    contrasena: z.string()
        .min(1, 'La contraseña actual es requerida')
        .refine(val => !val.includes(' '), 'La contraseña no debe contener espacios'),
    nuevaContrasena: z.string()
        .min(12, 'La nueva contraseña debe tener al menos 12 caracteres')
        .max(30, 'La nueva contraseña no puede tener más de 30 caracteres')
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, 'La contraseña debe incluir letras, números y símbolos')
        .refine(val => !val.includes(' '), 'La nueva contraseña no debe contener espacios'),
    confirmarContrasena: z.string()
        .min(12, 'La confirmación de contraseña debe tener al menos 12 caracteres')
        .max(30, 'La confirmación de contraseña no puede tener más de 30 caracteres')
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, 'La contraseña debe incluir letras, números y símbolos')
        .refine(val => !val.includes(' '), 'La confirmación de contraseña no debe contener espacios'),
}).refine((data) => data.nuevaContrasena === data.confirmarContrasena, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmarContrasena'],
}); 
