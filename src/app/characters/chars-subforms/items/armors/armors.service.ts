import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../../resources/resources.service';
import { AAddonsModel, ArmorsModel } from './armors.model';

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
          csoport: e.csoport,
          szint: e.szint,
          suly: e.suly,
          kiegekSulya: e.kiegekSulya,
          ar: e.ar,
          kiegekAra: e.kiegekAra,
          elhelyezes: e.elhelyezes,
          felszerelt: Array(e.felszerelt),
          megjegyzes: e.megjegyzes,
          addons: this.fb.array(this.setAAddons(e.addons))
        }))
      });
      return armors;
  }

  setAAddons(data: any[] | null) {
    let arr:any =[];
    data?.forEach((a:any) => {
      arr.push(
        this.fb.group({
          _id: [a._id, Validators.required],
          nev: [a.nev, Validators.required],
          csoport: [a.csoport, Validators.required],
          suly: [a.suly, Validators.required],
          sulySzorzo: [a.sulySzorzo, Validators.required],
          ar: [a.ar, Validators.required],
          arSzorzo: [a.arSzorzo, Validators.required],
          megjegyzes: [a.megjegyzes, Validators.required],
        })
      )});
    return arr;
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
      kiegekSulya: [0, Validators.required],
      ar: [a.ar, Validators.required],
      kiegekAra: [0, Validators.required],
      felszerelt: [Array(), Validators.required],
      megjegyzes: [a.megjegyzes, Validators.required],
      elhelyezes: ['raktár', Validators.required],
      addons: this.fb.array([])
    });
    this.resServ.payToke(a.ar);
    (this.armorsForm.get('armors') as FormArray).push(armor);
  }

  removeArmor(i:number): void {
    const arVissza = (this.armorsForm.get('armors') as FormArray).at(i).get('ar')?.value;
    const arVisszaKieggel = arVissza + (this.armorsForm.get('armors') as FormArray).at(i).get('kiegekAra')?.value;
    this.resServ.payToke(-arVisszaKieggel);
    (this.armorsForm.get('armors') as FormArray).removeAt(i);
  }

  addAAddon(w: AAddonsModel, i: number): void {
    if (w.nev == null) {
      return;
    }
    const addon = this.fb.group({
      _id: [w._id, Validators.required],
      nev: [w.nev, Validators.required],
      csoport: [w.csoport, Validators.required],
      suly: [w.suly, Validators.required],
      sulySzorzo: [w.sulySzorzo, Validators.required],
      ar: [w.ar, Validators.required],
      arSzorzo: [w.arSzorzo, Validators.required],
      megjegyzes: [w.megjegyzes, Validators.required],
    });
    const armor = (this.armorsForm.get('armors') as FormArray).at(i);
    const kiegAr = Math.round(w.ar + this.getFcArr(i, 'ar')?.value*(w.arSzorzo-1));
    const kiegSuly = Math.round(w.suly + this.getFcArr(i, 'suly')?.value*(w.sulySzorzo-1));
    armor.get('kiegekAra')?.patchValue(armor.get('kiegekAra')?.value + kiegAr);
    armor.get('kiegekSulya')?.patchValue(armor.get('kiegekSulya')?.value + kiegSuly);
    this.felszerel(i, w._id);
    this.resServ.payToke(kiegAr);
    return (armor.get('addons') as FormArray).push(addon);
  }

  removeAAddon(wi:number, ai:number): void {
    const addon = (this.armorsForm.get('armors') as FormArray).at(wi).get('addons') as FormArray;
    const arVissza = addon.at(ai).get('ar')?.value;
    this.resServ.payToke(-arVissza);
    addon.removeAt(ai);
  }

  felszerel(i:number, id: any) {
    const armor = (this.armorsForm.get('armors') as FormArray).at(i).get('felszerelt');
    return armor?.value.push(id);
  }

  getFcArr(i:number, fcName:string) {
    const armor = ((this.armorsForm.get('armors') as FormArray).at(i) as FormGroup).get(fcName);
    return armor;
  }

}
