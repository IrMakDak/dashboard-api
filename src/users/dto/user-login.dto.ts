import { IsEmail, IsString } from "class-validator";

export class UserLoginDto {
  @IsEmail({}, { message: "Wrong email" })
  email: string;
  @IsString({ message: "Enter password" })
  password: string;

  constructor() {
    this.email = "";
    this.password = "";
  }
}
