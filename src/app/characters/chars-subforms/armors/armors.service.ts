import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { ArmorsModel } from './armors.model';

@Injectable({
  providedIn: 'root'
})
export class ArmorsService {

  constructor(
    private fb: FormBuilder,
    private resServ: ResourcesService,
  ) { }

  armorsForm!: FormGroup;

  createArmors(): FormGroup {
    const armors = {
      armorRating: [0, Validators.required],
      armors: this.fb.array([]),
    };
    return this.armorsForm = this.fb.group(armors);
  }

  setArmors(dataset: any[]): FormArray {
    const armors = (this.armorsForm.get('armors') as FormArray);
    dataset.forEach(e => {
      armors.push(
        this.fb.group({
          _id: e._id,
          nev: e.nev,
          csoport: e.kategoria,
          szint: e.szint,
          suly: e.suly,
          ar: e.ar,
          elhelyezes: e.elhelyezes,
          megjegyzes: e.megjegyzes,
        }))
    });
    return armors;
  }

  addArmor(a: ArmorsModel): void {
    if (a.nev == null) {
      return;
    }
    const armor = this.fb.group({
      _id: [a._id, Validators.required],
      nev: [a.nev, Validators.required],
      csoport: [a.csoport, Validators.required],
      szint: [a.szint, Validators.required],
      suly: [a.suly, Validators.required],
      ar: [a.ar, Validators.required],
      megjegyzes: [a.megjegyzes, Validators.required],
      elhelyezes: ['raktár', Validators.required],
    });
    this.resServ.fizetesTokebol(a.ar);
    (this.armorsForm.get('armors') as FormArray).push(armor);
  }

  removeArmor(i:number): void {
    const arVissza = (this.armorsForm.get('armors') as FormArray).at(i).get('ar')?.value;
    this.resServ.fizetesTokebol(-arVissza);
    (this.armorsForm.get('armors') as FormArray).removeAt(i);
  }

  getFc(fcName:string) {
    const fc = this.armorsForm.get(fcName);
    return fc;
  }

  getFcArr(i:number, fcName:string) {
    const armor = ((this.armorsForm.get('armors') as FormArray).at(i) as FormGroup).get(fcName);
    return armor;
  }

}
