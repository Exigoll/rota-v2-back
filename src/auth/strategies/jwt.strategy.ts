import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'test',
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const data = { id: payload.sub, email: payload.email };
    const user = await this.userService.findById(data.id);

    if (!user) {
      throw new UnauthorizedException('У Вас нет доступа к этой странице');
    }

    return {
      id: user.id,
      email: user.email,
      login: user.login,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      additionalPhoneNumber: user.additionalPhoneNumber,
      address: user.address,
      kindOfActivity: user.kindOfActivity,
      legalForm: user.legalForm,
    };
  }
}