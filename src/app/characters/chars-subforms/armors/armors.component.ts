import { Component, OnInit } from '@angular/core';
import { ArmorsService } from './armors.service';
import { FormArray, FormControl } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { SelectArmorService } from 'src/app/elements/modals/select-armors/select-armor.service';
import { HideService } from 'src/app/elements/hide-content/hide-content.service';
import { SortMeService } from 'src/app/elements/sortme/sort-me.service';

@Component({
  selector: 'app-armors',
  templateUrl: './armors.component.html',
  styleUrls: ['./armors.component.css'],
  providers: [HideService]
})
export class ArmorsComponent implements OnInit {

  constructor(
    public armorsServ: ArmorsService,
    public resServ: ResourcesService,
    public sArmorServ: SelectArmorService,
    private sortServ: SortMeService
  ) { }

  public get armors(): FormArray | null | any {
    if(!this.armorsServ.armorsForm) {
      return null;
    }
    return this.armorsServ.armorsForm.controls['armors'] as FormArray;
  }

  getCsoportok():Array<any> {
    const form = (this.armorsServ.armorsForm.get('armors') as FormArray);
    const csoportArr = Object.values(form.controls).map(x => x.value).map(x => x.csoport);
    const csopArrUniq = [...new Set(csoportArr.map(x=> x))];
    csopArrUniq.sort();
    return csopArrUniq;
  }

  getControls() {
    const controls = (this.armorsServ.armorsForm.get('armors') as FormArray).controls;
    return controls;

  }

  changePlace(i: number) {
    const form = (this.armorsServ.armorsForm.get('armors') as FormArray);
    const elhArr = Object.values(form.controls).map(x => x.value);
    const csoport = (this.armorsServ.armorsForm.get('armors') as FormArray).at(i).get('csoport')?.value;
    const karakteren:boolean = elhArr.some(x => x.csoport == csoport && x.elhelyezes =='viselt');

    const elhelyezes = (this.armorsServ.armorsForm.get('armors') as FormArray).at(i).get('elhelyezes');
    const changeAr = this.armorsServ.armorsForm.get('armorRating');
    const szint = (this.armorsServ.armorsForm.get('armors') as FormArray).at(i).get('szint')?.value;

    if (elhelyezes?.value == 'raktár') {
      return elhelyezes.patchValue('táska');
    }
    if (elhelyezes?.value == 'táska' && !karakteren) {
      return [
        changeAr?.patchValue(changeAr.value + szint),
        elhelyezes.patchValue('viselt')
      ];
    }
    if (elhelyezes?.value == 'viselt') {
      return [
        changeAr?.patchValue(changeAr.value - szint),
        elhelyezes.patchValue('raktár')
      ];
    }
    return elhelyezes?.patchValue('raktár');
  }

  ngOnInit(): void {
    this.armorsServ.createArmors();
  }
}
