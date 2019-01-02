import { Deserializable } from './deserializable.model';

export class User implements Deserializable {
  id?: number;
  name?: string;
  avatar?: string;
  login?: string;
  password?: string;
  confirmPassword?: string;

  deserialize(input: any) {
    this.id = input.Id;
    this.login = input.Login;
    this.password = input.Password;
    this.avatar = input.FileName;
    this.name = input.Name;
    return this;
  }
}
