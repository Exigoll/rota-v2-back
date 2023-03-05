import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3)
  login: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  email: string;

  @Length(6, 32, { message: 'Пароль должен содержать не менее 6 символов' })
  password: string;

  @Length(6, 42, { message: 'Ф.И.О. должно содержать не менее 6 символов' })
  fullName: string;

  @Length(11)
  phoneNumber: string;

  @Length(11)
  additionalPhoneNumber?: string;

  @Length(12)
  address: string;

  legalForm: string;

  kindOfActivity: string;
}
