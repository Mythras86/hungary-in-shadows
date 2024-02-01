import { Component } from '@angular/core';
import { WeaponsService } from './weapons.service';
import { ResourcesService } from '../resources/resources.service';
import { FormArray } from '@angular/forms';
import { SelectWeaponService } from 'src/app/elements/modals/select-weapons/select-weapons.service';
import { SelectWAddonService } from 'src/app/elements/modals/select-wAddons/select-wAddons.service';

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
    public sWAddonServ: SelectWAddonService
  ) { }

  public get weapons(): FormArray | null | any {
    if(!this.weaponsServ.weaponsForm) {
      return null;
    }
    return this.weaponsServ.weaponsForm.controls['weapons'] as FormArray;
  }

  getWAddons(i: number): FormArray | null | any {
    const addons = this.weapons.at(i).get('addons') as FormArray;
    if (addons) {
      return addons;
    }
    return null;
  }

  getCsoportok():Array<any> {
    const form = (this.weaponsServ.weaponsForm.get('weapons') as FormArray);
    const csoportArr = Object.values(form.controls).map(x => x.value).map(x => x.csoport);
    const csopArrUniq = [...new Set(csoportArr.map(x=> x))];
    csopArrUniq.sort();
    return csopArrUniq;
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

  getSebKod(sebKod: string){
    if (sebKod == 'Fizikai') {
      return 'F';
    }
    return 'K';
  }

  getLenght(i: number):number {
    const length: Array<string> = (this.weaponsServ.weaponsForm.get('weapons') as FormArray).at(i).get('felszerelt')?.value;
    return length.length ?? 0;
  }

  ngOnInit(): void {
  }
}
