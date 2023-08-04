import { Component } from '@angular/core';
import { SpiritsService } from './spirits.service';
import { ResourcesService } from '../resources/resources.service';
import { SelectSpiritsService } from 'src/app/elements/modals/select-spirits/select-spirits.service';
import { LevelcontrolService } from 'src/app/elements/modals/levelcontrol/levelcontrol.service';
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
    public sSpiritServ: SelectSpiritsService,
    public lvlContServ: LevelcontrolService,
    public attrServ: AttributesService
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

  getControls() {
    const controls = (this.spiritsServ.spiritsForm.get('spirits') as FormArray).controls;
    return controls;

  }

  ngOnInit(): void {
    this.spiritsServ.createSpirits();
  }
}