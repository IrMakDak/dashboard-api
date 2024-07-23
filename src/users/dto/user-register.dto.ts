import { IsEmail, IsString } from "class-validator";

export class UserRegisterDto {
  @IsEmail({}, { message: "Wrong email" })
  email: string;
  @IsString({ message: "Enter password" })
  password: string;
  @IsString({ message: "Enter name" })
  name: string;

  constructor() {
    this.email = "";
    this.password = "";
    this.name = "";
  }
}
