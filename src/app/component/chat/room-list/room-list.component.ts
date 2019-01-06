import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room } from 'src/app/model/room.model';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  @Input() rooms: Room[];
  @Input() id: number;
  @Output() selectRoom = new EventEmitter<object>();
  constructor() {}

  ngOnInit() {}

  enterRoom = (name: string, id: number) => {
    this.selectRoom.emit({ name, id });
  }
}
