import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-options',
  templateUrl: './btn-options.component.html',
  styleUrls: ['./btn-options.component.scss']
})
export class BtnOptionsComponent {

  @Input() text: string = '';
  @Output() buttonAction: EventEmitter<void> = new EventEmitter();


}
