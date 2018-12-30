import { User } from './user.model';
import { Deserializable } from './deserializable.model';

export class Message implements Deserializable {
  sender?: User;
  content?: any;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
