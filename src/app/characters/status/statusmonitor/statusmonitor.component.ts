import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-statusmonitor',
  templateUrl: './statusmonitor.component.html',
  styleUrls: ['./statusmonitor.component.scss']
})
export class StatusmonitorComponent {

  @Input() headText: string = '';
  @Input() statusCode: number = 0;

  @Output() newStatusCode = new EventEmitter<number>()

  setStatus(i: number): void {
    this.newStatusCode.emit(i);
  }

  setColor(i: number):string {
    if(i < this.statusCode) {
      return 'nrd';
    }
    if(i == this.statusCode && i != 0) {
      return 'nyllw';
    }
    return 'ngrn';
  }

}
