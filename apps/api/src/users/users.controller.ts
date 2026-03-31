import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtPayload } from '../auth/strategies/jwt.strategy';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly users: UsersService) {}

  /** GET /api/users — solo ADMIN */
  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.users.findAll();
  }

  /** GET /api/users/me — usuario autenticado */
  @Get('me')
  getMe(@CurrentUser() user: JwtPayload) {
    return this.users.findOne(user.sub);
  }

  /** GET /api/users/:id — solo ADMIN */
  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.users.findOne(id);
  }

  /** PATCH /api/users/me — usuario autenticado */
  @Patch('me')
  updateMe(@CurrentUser() user: JwtPayload, @Body() dto: UpdateUserDto) {
    return this.users.update(user.sub, dto);
  }

  /** PATCH /api/users/:id — solo ADMIN */
  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.users.update(id, dto);
  }

  /** DELETE /api/users/:id — solo ADMIN (soft delete) */
  @Delete(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.users.remove(id);
  }
}
