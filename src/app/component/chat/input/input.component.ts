import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  messageContent: string;
  @Output() message = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  send = () => {
    this.message.emit(this.messageContent);
    this.messageContent = null;
  }
}
