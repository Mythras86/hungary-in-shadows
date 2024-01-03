import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-money',
  templateUrl: './field-money.component.html',
  styleUrls: ['./field-money.component.css']
})
export class FieldMoneyComponent {

  @Input() value: number = 0;

}
