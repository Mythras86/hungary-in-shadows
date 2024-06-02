import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-toke',
  templateUrl: './field-toke.component.html',
  styleUrls: ['./field-toke.component.scss']
})
export class FieldTokeComponent {

  @Input() ertek: number = 0;
  @Input() szin: string = 'toke';

}
