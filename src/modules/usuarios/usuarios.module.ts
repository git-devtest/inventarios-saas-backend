import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

/**
 * Módulo de Usuarios
 * 
 * Agrupa:
 * - Controller (rutas)
 * - Service (lógica de negocio)
 * 
 * PrismaService se inyecta automáticamente porque PrismaModule es @Global()
 */
@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService], // Exportar para usarlo en otros módulos si es necesario
})
export class UsuariosModule {}