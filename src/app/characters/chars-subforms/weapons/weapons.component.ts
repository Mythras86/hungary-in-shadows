import { Component } from '@angular/core';
import { WeaponsService } from './weapons.service';
import { ResourcesService } from '../resources/resources.service';
import { LevelcontrolService } from 'src/app/elements/modals/levelcontrol/levelcontrol.service';
import { FormArray } from '@angular/forms';
import { SelectWeaponService } from 'src/app/elements/modals/select-weapons/select-weapons.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent {

  constructor(
    public weaponsServ: WeaponsService,
    public resServ: ResourcesService,
    public sWeaponServ: SelectWeaponService,
    public lvlContServ: LevelcontrolService,
  ) { }

  public get weapons(): FormArray | null | any {
    if(!this.weaponsServ.weaponsForm) {
      return null;
    }
    return this.weaponsServ.weaponsForm.controls['weapons'] as FormArray;
  }

  getCsoportok():Array<any> {
    const form = (this.weaponsServ.weaponsForm.get('weapons') as FormArray);
    const csoportArr = Object.values(form.controls).map(x => x.value).map(x => x.csoport);
    const csopArrUniq = [...new Set(csoportArr.map(x=> x))];
    return csopArrUniq;
  }

  getControls() {
    const controls = (this.weaponsServ.weaponsForm.get('weapons') as FormArray).controls;
    return controls;
  }

  changePlace(i: number) {
    const elhelyezes = (this.weaponsServ.weaponsForm.get('weapons') as FormArray).at(i).get('elhelyezes');

    if (elhelyezes?.value == 'raktár') {
      return elhelyezes.patchValue('táska');
    }
    if (elhelyezes?.value == 'táska') {
      return elhelyezes.patchValue('viselt')
    }
    return elhelyezes?.patchValue('raktár');
  }

  ngOnInit(): void {
    this.weaponsServ.createWeapons();
  }
}
