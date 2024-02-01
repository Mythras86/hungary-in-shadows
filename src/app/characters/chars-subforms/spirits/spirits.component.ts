import { Component } from '@angular/core';
import { SpiritsService } from './spirits.service';
import { ResourcesService } from '../resources/resources.service';
import { SelectSpiritsService } from 'src/app/elements/modals/select-spirits/select-spirits.service';
import { FormArray } from '@angular/forms';
import { AttributesService } from '../attributes/attributes.service';

@Component({
  selector: 'app-spirits',
  templateUrl: './spirits.component.html',
  styleUrls: ['./spirits.component.css']
})
export class SpiritsComponent {

  constructor(
    public spiritsServ: SpiritsService,
    public resServ: ResourcesService,
    public attrServ: AttributesService,
    public sSpiritServ: SelectSpiritsService,
  ) { }

  public get spirits(): FormArray | null | any {
    if(!this.spiritsServ.spiritsForm) {
      return null;
    }
    return this.spiritsServ.spiritsForm.controls['spirits'] as FormArray;
  }

  getCsoportok():Array<any> {
    const form = (this.spiritsServ.spiritsForm.get('spirits') as FormArray);
    const csoportArr = Object.values(form.controls).map(x => x.value).map(x => x.csoport);
    const csopArrUniq = [...new Set(csoportArr.map(x=> x))];
    csopArrUniq.sort();
    return csopArrUniq;
  }

  decSzolgalat(i: number) {
    const szolgalat = (this.spiritsServ.spiritsForm.get('spirits') as FormArray).at(i).get('szolgalatok');
    if (szolgalat?.value <= 0) {
      return;
    }
    return szolgalat?.patchValue(szolgalat?.value-1);
  }

  ngOnInit(): void {
  }
}
