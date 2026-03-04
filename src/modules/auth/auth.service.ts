import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(username: string, pass: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user || !user.active) {
      throw new UnauthorizedException('Invalide credentials or disabled account.');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      groupId: user.groupId
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}