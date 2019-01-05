import { Deserializable } from './deserializable.model';
import { SafeResourceUrl } from '@angular/platform-browser';

export class User implements Deserializable {
  id?: number;
  name?: string;
  fileName?: string;
  photo?: SafeResourceUrl;
  login?: string;
  password?: string;
  confirmPassword?: string;

  deserialize(input: any) {
    this.id = input.Id;
    this.login = input.Login;
    this.password = input.Password;
    this.fileName = input.FileName;
    this.name = input.Name;
    return this;
  }
}
