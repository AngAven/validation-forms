export interface LoginForm {
  numeroCuenta: string;
  password: string;
}

export interface TarjetaForm {
  nombre?: string;
  numeroTarjeta?: string;
  mes?: string;
  anio?: string;
  cvv: string;
}

export interface ContrasenaForm {
  contrasena: string;
  nuevaContrasena: string;
  confirmarContrasena: string;
} 