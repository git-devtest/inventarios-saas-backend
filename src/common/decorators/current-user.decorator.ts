import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserPayload {
  id: string;
  email: string;
  nombre: string;
  empresa_id: string;
  rol_id: string;
  rol_nombre: string;
}

/**
 * Decorator para obtener el usuario actual desde el request
 * Uso: @CurrentUser() user: UserPayload
 */
export const CurrentUser = createParamDecorator(
  (data: keyof UserPayload | undefined, ctx: ExecutionContext): UserPayload | any => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);