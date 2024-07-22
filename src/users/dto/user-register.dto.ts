export class UserRegisterDto {
  email: string;
  password: string;
  name: string;

  constructor() {
    this.email = "";
    this.password = "";
    this.name = "";
  }
}
