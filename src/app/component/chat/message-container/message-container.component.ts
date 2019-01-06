import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/model/message.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss']
})
export class MessageContainerComponent implements OnInit {

  @Input() messages: Message[] = [];
  @Input() name: string;
  @Input() length: number;

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
  }

}
