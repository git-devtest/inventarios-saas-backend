import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Decorator para especificar qué roles pueden acceder a un endpoint
 * Uso: @Roles('Administrador', 'Operador')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);