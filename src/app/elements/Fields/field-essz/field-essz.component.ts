import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-essz',
  templateUrl: './field-essz.component.html',
  styleUrls: ['./field-essz.component.scss']
})
export class FieldEsszComponent {

  @Input() ertek: number = 0;
  @Input() szin: string = 'esszencia';

}
