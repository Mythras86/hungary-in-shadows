import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';

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
          nev: e.nev,
          csoport: e.kategoria,
          szint: e.szint,
          suly: e.suly,
          ar: e.ar,
          megjegyzes: e.megjegyzes,
          elhelyezes: e.elhelyezes,
        }))
    });
    return armors;
  }

  addArmor(addNev: string, addKateg: string, addSzint: number, addSuly: number, addAr: number, addMegj: string): void {
    if (addNev == null) {
      return;
    }
    const armor = this.fb.group({
      nev: [addNev, Validators.required],
      csoport: [addKateg, Validators.required],
      szint: [addSzint, Validators.required],
      suly: [addSuly, Validators.required],
      ar: [addAr, Validators.required],
      megjegyzes: [addMegj, Validators.required],
      elhelyezes: ['raktár', Validators.required],
    });
    (this.armorsForm.get('armors') as FormArray).push(armor);
    this.resServ.fizetesTokebol(addAr);
  }

  removeArmor(i:number): void {
    const arVissza = (this.armorsForm.get('armors') as FormArray).at(i).get('ar')?.value;
    this.resServ.fizetesTokebol(-arVissza);
    (this.armorsForm.get('armors') as FormArray).removeAt(i);
  }

  getFc(fcName:string) {
    const aR = this.armorsForm.get(fcName);
    return aR;
  }

  getFcArr(i:number, fcName:string) {
    const armor = ((this.armorsForm.get('armors') as FormArray).at(i) as FormGroup).get(fcName);
    return armor;
  }

}
