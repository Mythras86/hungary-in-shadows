import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ArmorsService {

  constructor(
    private fb: FormBuilder
  ) { }

  armorsForm!: FormGroup;

  createArmors(): FormGroup {
    const armors = {
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
          kategoria: e.kategoria,
          szint: e.szint,
          suly: e.suly,
          ar: e.ar,
          megjegyzes: e.megjegyzes,
        }))
    });
    return armors;
  }

  addArmor(addNev: string, addKateg: string, addSzint: number, addSuly: number, addAr: number, addMegj: string) {
    if (addNev == '') {
      return;
    }
    const armor = this.fb.group({
      nev: [addNev, Validators.required],
      kategoria: [addKateg, Validators.required],
      szint: [addSzint, Validators.required],
      suly: [addSuly, Validators.required],
      ar: [addAr, Validators.required],
      megjegyzes: [addMegj, Validators.required],
    });
    (this.armorsForm.get('armors') as FormArray).push(armor);
  }

  removeArmor(i:number): void {
    (this.armorsForm.get('armors') as FormArray).removeAt(i);
  }

  getFc(i:number) {
    const armor = ((this.armorsForm.get('armors') as FormArray).at(i) as FormGroup);
    return armor;
  }

}
