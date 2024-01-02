import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'angular_top',
      signOptions: { expiresIn: '15m' },
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
