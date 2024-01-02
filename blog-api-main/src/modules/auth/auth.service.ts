import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(body: SignInDto) {
    const user = await this.userService.getByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException(
        `Couldn't find an user with email = ${body.email}`,
      );
    }
    const passMatch = await bcrypt.compare(body.password, user.password);
    if (!passMatch) {
      throw new UnauthorizedException(`Incorrect password`);
    }

    return this.generateToken(user);
  }

  async signUp(body: SignUpDto) {
    const candidate = await this.userService.getByEmail(body.email);
    if (candidate) {
      throw new BadRequestException(`User already exists`);
    }
    const passwordHash = await bcrypt.hash(body.password, 5);
    const user = await this.userService.createUser({
      ...body,
      password: passwordHash,
    });

    delete user.password;

    return {
      user: user,
      tokens: this.generateToken(user),
    };
  }

  async isAuthed(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: 'angular_top',
      });

      return true;
    } catch {
      return false;
    }
  }

  private generateToken(user: UserEntity) {
    const payload = { username: user.username, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
