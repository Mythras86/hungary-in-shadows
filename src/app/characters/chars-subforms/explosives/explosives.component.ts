import { Component } from '@angular/core';
import { ExplosivesService } from './explosives.service';
import { ResourcesService } from '../resources/resources.service';
import { LevelcontrolService } from 'src/app/elements/modals/levelcontrol/levelcontrol.service';
import { FormArray } from '@angular/forms';
import { SelectWeaponService } from 'src/app/elements/modals/select-weapons/select-weapons.service';

@Component({
  selector: 'app-explosives',
  templateUrl: './explosives.component.html',
  styleUrls: ['./explosives.component.css']
})
export class ExplosivesComponent {

  constructor(
    public explosivesServ: ExplosivesService,
    public resServ: ResourcesService,
    public sWeaponServ: SelectWeaponService,
    public lvlContServ: LevelcontrolService,
  ) { }

  public get explosives(): FormArray | null | any {
    if(!this.explosivesServ.explosivesForm) {
      return null;
    }
    return this.explosivesServ.explosivesForm.controls['explosives'] as FormArray;
  }

  getCsoportok():Array<any> {
    const form = (this.explosivesServ.explosivesForm.get('explosives') as FormArray);
    const csoportArr = Object.values(form.controls).map(x => x.value).map(x => x.csoport);
    const csopArrUniq = [...new Set(csoportArr.map(x=> x))];
    csopArrUniq.sort();
    return csopArrUniq;
  }

  getControls() {
    const controls = (this.explosivesServ.explosivesForm.get('explosives') as FormArray).controls;
    return controls;

  }

  changePlace(i: number) {
    const elhelyezes = (this.explosivesServ.explosivesForm.get('explosives') as FormArray).at(i).get('elhelyezes');

    if (elhelyezes?.value == 'raktár') {
      return elhelyezes.patchValue('táska');
    }
    if (elhelyezes?.value == 'táska') {
      return elhelyezes.patchValue('viselt')
    }
    return elhelyezes?.patchValue('raktár');
  }

  ngOnInit(): void {
    this.explosivesServ.createExplosives();
  }
}
