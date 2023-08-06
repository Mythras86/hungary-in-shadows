import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { WAddonsModel, WeaponsModel } from './weapons.model';
import { ExplosivesService } from '../explosives/explosives.service';

@Injectable({
  providedIn: 'root'
})
export class WeaponsService {

  constructor(
    private fb: FormBuilder,
    private resServ: ResourcesService,
    private explosivesServ: ExplosivesService
  ) { }

  weaponsForm!: FormGroup;

  createWeapons(): FormGroup {
    const weapons = {
      weapons: this.fb.array([]),
    };
    return this.weaponsForm = this.fb.group(weapons);
  }

  setWeapons(dataset: any[]): FormArray {
    const weapons = (this.weaponsForm.get('weapons') as FormArray);
    dataset.forEach(e => {
      weapons.push(
        this.fb.group({
          _id: e._id,
          nev: e.nev,
          csoport: e.csoport,
          tipus: e.tipus,
          tar: e.tar,
          tamadasiModok: e.tamadasiModok,
          tav: e.tav,
          ero: e.ero,
          sebzes: e.sebzes,
          sebzesTipus: e.sebzesTipus,
          suly: e.suly,
          ar: e.ar,
          elhelyezes: e.elhelyezes,
          megjegyzes: e.megjegyzes,
        }))
    });
    return weapons;
  }

  addWeapon(w: WeaponsModel): void {
    if (w.nev == null) {
      return;
    }
    const weapon = this.fb.group({
      _id: [w._id, Validators.required],
      nev: [w.nev, Validators.required],
      csoport: [w.csoport, Validators.required],
      tipus: [w.tipus, Validators.required],
      tar: [w.tar, Validators.required],
      tamadasiModok: [w.tamadasiModok, Validators.required],
      tav: [w.tav, Validators.required],
      ero: [w.ero, Validators.required],
      sebzes: [w.sebzes, Validators.required],
      sebzesTipus: [w.sebzesTipus, Validators.required],
      suly: [w.suly, Validators.required],
      kiegekSulya: [0, Validators.required],
      ar: [w.ar, Validators.required],
      kiegekAra: [0, Validators.required],
      elhelyezes: ['raktár', Validators.required],
      felszerelt: [Array(), Validators.required],
      megjegyzes: [w.megjegyzes, Validators.required],
      addons: this.fb.array([])
    });
    this.resServ.fizetesTokebol(w.ar);
    return (this.weaponsForm.get('weapons') as FormArray).push(weapon);
  }

  removeWeapon(i:number): void {
    const arVissza = (this.weaponsForm.get('weapons') as FormArray).at(i).get('ar')?.value;
    const arVisszaKieggel = arVissza + (this.weaponsForm.get('weapons') as FormArray).at(i).get('kiegekAra')?.value;
    this.resServ.fizetesTokebol(-arVisszaKieggel);
    (this.weaponsForm.get('weapons') as FormArray).removeAt(i);
  }

  addWAddon(w: WAddonsModel, i: number): void {
    if (w.nev == null) {
      return;
    }
    const addon = this.fb.group({
      _id: [w._id, Validators.required],
      nev: [w.nev, Validators.required],
      csoport: [w.csoport, Validators.required],
      elhelyezes: [w.elhelyezes, Validators.required],
      suly: [w.suly, Validators.required],
      sulySzorzo: [w.sulySzorzo, Validators.required],
      ar: [w.ar, Validators.required],
      arSzorzo: [w.arSzorzo, Validators.required],
      megjegyzes: [w.megjegyzes, Validators.required],
    });
    const weapon = (this.weaponsForm.get('weapons') as FormArray).at(i);
    const kiegAr = Math.round(w.ar + this.getFcArr(i, 'ar')?.value*(w.arSzorzo-1));
    const kiegSuly = Math.round(w.suly + this.getFcArr(i, 'suly')?.value*(w.sulySzorzo-1));
    weapon.get('kiegekAra')?.patchValue(kiegAr);
    weapon.get('kiegekSulya')?.patchValue(kiegSuly);
    this.felszerel(i, w.elhelyezes);
    this.resServ.fizetesTokebol(kiegAr);
    return (weapon.get('addons') as FormArray).push(addon);
  }

  removeWAddon(wi:number, ai:number): void {
    const addon = (this.weaponsForm.get('weapons') as FormArray).at(wi).get('addons') as FormArray;
    const arVissza = addon.at(ai).get('ar')?.value;
    this.resServ.fizetesTokebol(-arVissza);
    addon.removeAt(ai);
  }

  felszerel(i:number, kieg: any) {
    const weapon = (this.weaponsForm.get('weapons') as FormArray).at(i).get('felszerelt');
    if (weapon?.value.find((x:string)=>x == kieg)) {
      return;
    }
    return weapon?.value.push(kieg)
  }

  getFcArr(i:number, fcName:string) {
    const fc = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get(fcName);
    return fc;
  }

  getSubFcArr(first:number, second:number, fcName:string) {
    const fc = ((this.weaponsForm.get('weapons') as FormArray).at(first).get('addons') as FormArray).at(second).get(fcName);
    return fc;
  }

}
