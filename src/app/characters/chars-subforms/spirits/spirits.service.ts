import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { SpiritsModel } from './spirits.model';

@Injectable({
  providedIn: 'root'
})
export class SpiritsService {

  constructor(
    private fb: FormBuilder,
    private resServ: ResourcesService,
  ) { }

  spiritsForm!: FormGroup;

  createSpirits(): FormGroup {
    const spirits = {
      spirits: this.fb.array([]),
    };
    return this.spiritsForm = this.fb.group(spirits);
  }

  setSpirits(dataset: any[]): FormArray {
    const spirits = (this.spiritsForm.get('spirits') as FormArray);
    dataset.forEach(e => {
      spirits.push(
        this.fb.group({
          _id: e._id,
          nev: e.nev,
          csoport: e.csoport,
          kepessegek: e.kepessegek,
          fizEro: e.fizEro,
          fizGyo: e.fizGyo,
          fizUgy: e.fizUgy,
          fizKit: e.fizKit,
          asztEro: e.asztEro,
          asztGyo: e.asztGyo,
          asztUgy: e.asztUgy,
          asztKit: e.asztKit,
          szint: e.szint,
          tamadas: e.tamadas,
          szolgalatok: e.szolgalatok,
          ar: e.ar,
          karma: e.karma,
          megjegyzes: e.megjegyzes
        }))
    });
    return spirits;
  }

  addSpirit(s: SpiritsModel): void {
    if (s.nev == null) {
      return;
    }
    const spirit = this.fb.group({
      _id: [s._id, Validators.required],
      nev: [s.nev, Validators.required],
      csoport: [s.csoport, Validators.required],
      kepessegek: [s.kepessegek, Validators.required],
      fizEro: [s.fizEro, Validators.required],
      fizGyo: [s.fizGyo, Validators.required],
      fizUgy: [s.fizUgy, Validators.required],
      fizKit: [s.fizKit, Validators.required],
      asztEro: [s.asztEro, Validators.required],
      asztGyo: [s.asztGyo, Validators.required],
      asztUgy: [s.asztUgy, Validators.required],
      asztKit: [s.asztKit, Validators.required],
      szint: [1, Validators.required],
      tamadas: [s.tamadas, Validators.required],
      szolgalatok: [1, Validators.required],
      ar: [2000, Validators.required],
      karma: [1, Validators.required],
      megjegyzes: [s.megjegyzes, Validators.required]
    });
    this.resServ.payToke(2000);
    this.resServ.payKarma(1);
    (this.spiritsForm.get('spirits') as FormArray).push(spirit);
  }

  removeSpirit(i:number): void {
    const szint = (this.spiritsForm.get('spirits') as FormArray).at(i).get('szint')?.value;
    const szolgalatok = (this.spiritsForm.get('spirits') as FormArray).at(i).get('szolgalatok')?.value;
    this.resServ.payToke(-1000*szint-1000*szolgalatok);
    this.resServ.payKarma(-szint);
    (this.spiritsForm.get('spirits') as FormArray).removeAt(i);
  }

  getFcArr(i:number, fcName:string) {
    const spirit = ((this.spiritsForm.get('spirits') as FormArray).at(i) as FormGroup).get(fcName);
    return spirit;
  }

  getAkcio(i: number): number {
    const gyo = this.getFcArr(i, 'fizGyo')?.value;
    const int = this.getFcArr(i, 'asztGyo')?.value;
    const akcio = Math.floor((gyo+int)/2);
    if (akcio < 1) {
      return 1;
    }
    return akcio;
  }

  getKockatart(i: number): number {
    const szint = this.getFcArr(i, 'szint')?.value;
    const calc = Math.floor((szint)/2);
    return calc;
  }


}
