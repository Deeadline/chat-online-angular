import { Deserializable } from './deserializable.model';

export class Message implements Deserializable {
  sender?: string;
  content?: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
