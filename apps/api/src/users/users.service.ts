import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from '@nestlaunch/shared';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Mapeo ──────────────────────────────────────────────────────────────────

  private toDto(user: {
    id: string;
    email: string;
    name: string;
    role: import('@prisma/client').Role;
    createdAt: Date;
  }): UserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
    };
  }

  // ─── CRUD ────────────────────────────────────────────────────────────────────

  async findAll(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return users.map((u) => this.toDto(u));
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findFirst({
      where: { id, deletedAt: null },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.toDto(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserDto> {
    await this.findOne(id); // valida existencia

    const updated = await this.prisma.user.update({
      where: { id },
      data: dto,
    });

    return this.toDto(updated);
  }

  /** Soft delete — no borra físicamente la fila */
  async remove(id: string): Promise<void> {
    await this.findOne(id); // valida existencia

    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
