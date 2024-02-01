import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-toke',
  templateUrl: './field-toke.component.html',
  styleUrls: ['./field-toke.component.css']
})
export class FieldTokeComponent {

  @Input() ertek: number = 0;

}
