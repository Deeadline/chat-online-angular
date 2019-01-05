import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/model/message.model';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.css']
})
export class MessageContainerComponent implements OnInit {

  @Input() messages: Message[] = [];
  @Input() name: string;
  @Input() length: number;

  constructor() { }

  ngOnInit() {
  }

}
