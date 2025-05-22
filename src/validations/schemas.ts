import { z } from 'zod';

export const loginSchema = z.object({
  numeroCuenta: z.string()
    .min(1, 'El número de cuenta es requerido')
    .regex(/^\d+$/, 'El número de cuenta debe contener solo números'),
  password: z.string()
    .min(12, 'La contraseña debe tener al menos 12 caracteres')
    .max(30, 'La contraseña no puede tener más de 30 caracteres')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, 'La contraseña debe incluir letras, números y símbolos'),
});

export const tarjetaSchema = z.object({
  nombre: z.string().optional(),
  numeroTarjeta: z.string()
    .optional()
    .refine((val) => !val || /^\d{10}$|^\d{16}$/.test(val), 'El número de tarjeta debe tener 10 o 16 dígitos'),
  mes: z.string()
    .optional()
    .refine((val) => !val || /^(0[1-9]|1[0-2])$/.test(val), 'El mes debe estar entre 01 y 12'),
  anio: z.string()
    .optional()
    .refine((val) => !val || /^\d{2}$/.test(val), 'El año debe tener 2 dígitos'),
  cvv: z.string()
    .min(3, 'El CVV debe tener 3 dígitos')
    .max(4, 'El CVV debe tener máximo 4 dígitos')
    .regex(/^\d+$/, 'El CVV debe contener solo números'),
}).superRefine((data, ctx) => {
  // Validate that the card expiration date is not in the past
  if (data.mes && data.anio) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of current year
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11

    const cardYear = parseInt(data.anio, 10);
    const cardMonth = parseInt(data.mes, 10);

    if (cardYear < currentYear || (cardYear === currentYear && cardMonth < currentMonth)) {
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
    .min(1, 'La contraseña actual es requerida'),
  nuevaContrasena: z.string()
    .min(12, 'La nueva contraseña debe tener al menos 12 caracteres')
    .max(30, 'La nueva contraseña no puede tener más de 30 caracteres')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, 'La contraseña debe incluir letras, números y símbolos'),
  confirmarContrasena: z.string()
    .min(12, 'La confirmación de contraseña debe tener al menos 12 caracteres')
    .max(30, 'La confirmación de contraseña no puede tener más de 30 caracteres')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, 'La contraseña debe incluir letras, números y símbolos'),
}).refine((data) => data.nuevaContrasena === data.confirmarContrasena, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmarContrasena'],
}); 
