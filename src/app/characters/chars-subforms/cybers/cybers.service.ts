import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { AttributesService } from '../attributes/attributes.service';
import { CybersModel } from './cybers.model';

@Injectable({
  providedIn: 'root'
})
export class CybersService {

  constructor(
    private fb: FormBuilder,
    private resServ: ResourcesService,
    private attrServ: AttributesService,
  ) { }

  cybersForm!: FormGroup;

  createCybers(): FormGroup {
    const cybers = {
      cybers: this.fb.array([]),
    };
    return this.cybersForm = this.fb.group(cybers);
  }

  setCybers(dataset: any[]): FormArray {
    const cybers = (this.cybersForm.get('cybers') as FormArray);
    dataset.forEach(e => {
      cybers.push(
        this.fb.group({
          _id: e._id,
          nev: e.nev,
          csoport: e.csoport,
          minoseg: e.minoseg,
          maxSzint: e.maxSzint,
          szint: e.szint,
          ar: e.ar,
          esszencia: e.esszencia,
          megjegyzes: e.megjegyzes,
        }))
    });
    return cybers;
  }

  addCyber(c: CybersModel): void {
    if (c.nev == null) {
      return;
    }
    const cyber = this.fb.group({
      _id: [c._id, Validators.required],
      nev: [c.nev, Validators.required],
      csoport: [c.csoport, Validators.required],
      minoseg: [1, Validators.required],
      maxSzint: [c.maxSzint, Validators.required],
      szint: [1, Validators.required],
      ar: [c.ar, Validators.required],
      esszencia: [c.esszencia, Validators.required],
      megjegyzes: [c.megjegyzes, Validators.required],
    });
    this.resServ.payToke(c.ar);
    (this.cybersForm.get('cybers') as FormArray).push(cyber);
  }

  removeCyber(i:number): void {
    const arVissza = (this.cybersForm.get('cybers') as FormArray).at(i).get('ar')?.value;
    const esszVissza = (this.cybersForm.get('cybers') as FormArray).at(i).get('esszencia')?.value;
    const szint = (this.cybersForm.get('cybers') as FormArray).at(i).get('szint')?.value;
    this.resServ.payToke(-arVissza*szint);
    (this.cybersForm.get('cybers') as FormArray).removeAt(i);
  }

  minosegUp(i: number) {
    const minoseg = (this.cybersForm.get('cybers') as FormArray).at(i).get('minoseg');
    const ar = (this.cybersForm.get('cybers') as FormArray).at(i).get('ar')?.value;
    const essz = (this.cybersForm.get('cybers') as FormArray).at(i).get('esszencia')?.value;
    if ((minoseg?.value+1)<=3) {
      minoseg?.patchValue(minoseg?.value+1);
      this.resServ.payToke(ar);
    }
    return;
  }

  minosegDown(i: number) {
    const minoseg = (this.cybersForm.get('cybers') as FormArray).at(i).get('minoseg');
    const ar = (this.cybersForm.get('cybers') as FormArray).at(i).get('ar')?.value;
    const essz = (this.cybersForm.get('cybers') as FormArray).at(i).get('esszencia')?.value;
    if ((minoseg?.value-1)>=1) {
      minoseg?.patchValue(minoseg?.value-1);
      this.resServ.payToke(-ar);
    }
    return;
  }

  getEssValue(i: number):number {
    const minoseg = (this.cybersForm.get('cybers') as FormArray).at(i).get('minoseg');
    const essz = (this.cybersForm.get('cybers') as FormArray).at(i).get('esszencia')?.value;
    if (minoseg?.value == 3) {
      return Math.round((essz-essz*0.4)*1000)/1000;
    }
    if (minoseg?.value == 2) {
      return Math.round((essz-essz*0.2)*1000)/1000;
    }
    return essz;
  }


  getFcArr(i:number, fcName:string) {
    const cyber = ((this.cybersForm.get('cybers') as FormArray).at(i) as FormGroup).get(fcName);
    return cyber;
  }

}
