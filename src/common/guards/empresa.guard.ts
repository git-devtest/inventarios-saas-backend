import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UserPayload } from '../decorators/current-user.decorator';

/**
 * Guard para verificar que el usuario solo acceda a recursos de su propia empresa
 * Se usa en endpoints que reciben empresaId en params/query/body
 */
@Injectable()
export class EmpresaGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: UserPayload = request.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    // Buscar empresaId en diferentes lugares del request
    const empresaIdFromParams = request.params?.empresaId;
    const empresaIdFromQuery = request.query?.empresaId;
    const empresaIdFromBody = request.body?.empresaId;

    const empresaId = empresaIdFromParams || empresaIdFromQuery || empresaIdFromBody;

    // Si no hay empresaId en el request, permitir (asumimos que el endpoint filtra por empresa del usuario)
    if (!empresaId) {
      return true;
    }

    // Verificar que el empresaId del request coincida con el del usuario
    if (empresaId !== user.empresaId) {
      throw new ForbiddenException('No tiene acceso a recursos de otra empresa');
    }

    return true;
  }
}