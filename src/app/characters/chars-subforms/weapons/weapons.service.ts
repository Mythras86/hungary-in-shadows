import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { WeaponsModel } from './weapons.model';

@Injectable({
  providedIn: 'root'
})
export class WeaponsService {

  constructor(
    private fb: FormBuilder,
    private resServ: ResourcesService,
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
          megjegyzes: e.megjegyzes
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
      ar: [w.ar, Validators.required],
      elhelyezes: ['raktár', Validators.required],
      megjegyzes: [w.megjegyzes, Validators.required],
    });
    this.resServ.fizetesTokebol(w.ar);
    (this.weaponsForm.get('weapons') as FormArray).push(weapon);
  }

  removeWeapon(i:number): void {
    const arVissza = (this.weaponsForm.get('weapons') as FormArray).at(i).get('ar')?.value;
    const szint = (this.weaponsForm.get('weapons') as FormArray).at(i).get('szint')?.value;
    this.resServ.fizetesTokebol(-arVissza*szint);
    (this.weaponsForm.get('weapons') as FormArray).removeAt(i);
  }

  getFcArr(i:number, fcName:string) {
    const weapon = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get(fcName);
    return weapon;
  }

}
