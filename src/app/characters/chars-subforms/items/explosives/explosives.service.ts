import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../../resources/resources.service';
import { ExplosivesModel } from './explosives.model';

@Injectable({
  providedIn: 'root'
})
export class ExplosivesService {

  constructor(
    private fb: FormBuilder,
    private resServ: ResourcesService,
  ) { }

  explosivesForm!: FormGroup;

  createExplosives(): FormGroup {
    const explosives = {
      explosives: this.fb.array([]),
    };
    return this.explosivesForm = this.fb.group(explosives);
  }

  setExplosives(dataset: any[]): FormArray {
    const explosives = (this.explosivesForm.get('explosives') as FormArray);
    dataset.forEach(e => {
      explosives.push(
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
          darab: e.darab,
          megjegyzes: e.megjegyzes
        }))
    });
    return explosives;
  }

  addExplosive(e: ExplosivesModel): void {
    if (e.nev == null) {
      return;
    }
    const explosive = this.fb.group({
      _id: [e._id, Validators.required],
      nev: [e.nev, Validators.required],
      csoport: [e.csoport, Validators.required],
      tipus: [e.tipus, Validators.required],
      tar: [e.tar, Validators.required],
      tamadasiModok: [e.tamadasiModok, Validators.required],
      tav: [e.tav, Validators.required],
      ero: [e.ero, Validators.required],
      sebzes: [e.sebzes, Validators.required],
      sebzesTipus: [e.sebzesTipus, Validators.required],
      suly: [e.suly, Validators.required],
      ar: [e.ar, Validators.required],
      elhelyezes: ['raktár', Validators.required],
      darab: [1, Validators.required],
      megjegyzes: [e.megjegyzes, Validators.required],
    });
    this.resServ.payToke(e.ar);
    (this.explosivesForm.get('explosives') as FormArray).push(explosive);
  }

  removeExplosive(i:number): void {
    const arVissza = (this.explosivesForm.get('explosives') as FormArray).at(i).get('ar')?.value;
    const darab = (this.explosivesForm.get('explosives') as FormArray).at(i).get('darab')?.value;
    this.resServ.payToke(-arVissza*darab);
    (this.explosivesForm.get('explosives') as FormArray).removeAt(i);
  }

  getFcArr(i:number, fcName:string) {
    const explosive = ((this.explosivesForm.get('explosives') as FormArray).at(i) as FormGroup).get(fcName);
    return explosive;
  }

}
