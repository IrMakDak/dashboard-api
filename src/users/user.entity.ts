import bcryptjs from "bcryptjs";
const { hash } = bcryptjs;

export class User {
  private _password: string;
  constructor(private readonly _email: string, private readonly _name: string) {
    this._password = "";
  }

  get email() {
    return this._email;
  }

  get name() {
    return this._name;
  }

  get password() {
    return this._password;
  }

  public async setPassword(password: string, salt: number) {
    this._password = await hash(password, salt);
  }
}
