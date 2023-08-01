import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { AttributesService } from '../attributes/attributes.service';
import { pairwise, startWith } from 'rxjs';
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
      maxSzint: [c.maxSzint, Validators.required],
      szint: [1, Validators.required],
      ar: [c.ar, Validators.required],
      esszencia: [c.esszencia, Validators.required],
      megjegyzes: [c.megjegyzes, Validators.required],
    });
    this.resServ.fizetesTokebol(c.ar);
    this.attrServ.fizetesEsszenciabol(c.esszencia);
    (this.cybersForm.get('cybers') as FormArray).push(cyber);
  }

  removeCyber(i:number): void {
    const arVissza = (this.cybersForm.get('cybers') as FormArray).at(i).get('ar')?.value;
    const esszVissza = (this.cybersForm.get('cybers') as FormArray).at(i).get('esszencia')?.value;
    const szint = (this.cybersForm.get('cybers') as FormArray).at(i).get('szint')?.value;
    this.resServ.fizetesTokebol(-arVissza*szint);
    this.attrServ.fizetesEsszenciabol(-esszVissza*szint);
    (this.cybersForm.get('cybers') as FormArray).removeAt(i);
  }

  getFcArr(i:number, fcName:string) {
    const cyber = ((this.cybersForm.get('cybers') as FormArray).at(i) as FormGroup).get(fcName);
    return cyber;
  }

}
