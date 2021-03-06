import { User } from './user.model';
import { Message } from './message.model';
import { Deserializable } from './deserializable.model';

export class Room implements Deserializable {
  constructor() {
    this.users = [];
    this.messages = [];
  }
  id?: number;
  name?: string;
  users: User[];
  messages: Message[];

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
