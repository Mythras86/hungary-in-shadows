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
          spiritName: e.spiritName,
          spiritCategory: e.spiritCategory,
          spiritSkills: e.spiritSkills,
          spiritDesc: e.spiritDesc,
          spiritFizEro: e.spiritFizEro,
          spiritFizGyo: e.spiritFizGyo,
          spiritFizUgy: e.spiritFizUgy,
          spiritFizAll: e.spiritFizAll,
          spiritAsztEro: e.spiritAsztEro,
          spiritAsztGyo: e.spiritAsztGyo,
          spiritAsztUgy: e.spiritAsztUgy,
          spiritAsztAll: e.spiritAsztAll,
          spiritLevel: e.spiritLevel,
          spiritServices: e.spiritServices,
          spiritTotalPrice: e.spiritTotalPrice,
          spiritTotalKarma: e.spiritTotalKarma,
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
      szolgalatok: [1, Validators.required],
      ar: [1000, Validators.required],
      karma: [1, Validators.required],
      megjegyzes: [s.megjegyzes, Validators.required]
    });
    this.resServ.fizetesTokebol(1000);
    this.resServ.fizetesKarmabol(1);
    (this.spiritsForm.get('spirits') as FormArray).push(spirit);
  }

  removeSpirit(i:number): void {
    const szint = (this.spiritsForm.get('spirits') as FormArray).at(i).get('szint')?.value;
    this.resServ.fizetesTokebol(-1000*szint);
    this.resServ.fizetesKarmabol(-szint);
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
