import { Deserializable } from './deserializable.model';

export class User implements Deserializable {
  id?: number;
  name?: string;
  avatar?: string;
  login?: string;
  password?: string;
  confirmPassword?: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
