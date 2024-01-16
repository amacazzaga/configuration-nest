import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); // esto es un decorador construido para setear metadata a TRUE, sera aplicado a las rutas que sean de pubico acceso
// a su vez el autentication guard, evaluara cuando para un controllador encuentre metadata TRUE : eso querra decir que este decorador estara pasado ahi