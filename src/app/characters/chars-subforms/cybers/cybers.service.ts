import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { AttributesService } from '../attributes/attributes.service';
import { pairwise, startWith } from 'rxjs';

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

  addCyber(addId: string, addNev: string, addCsoport: string, addMSzint: number, addAr: number, addEssz: number, addMegj: string): void {
    if (addNev == null) {
      return;
    }
    const cyber = this.fb.group({
      _id: [addId, Validators.required],
      nev: [addNev, Validators.required],
      csoport: [addCsoport, Validators.required],
      maxSzint: [addMSzint, Validators.required],
      szint: [1, Validators.required],
      ar: [addAr, Validators.required],
      esszencia: [addEssz, Validators.required],
      megjegyzes: [addMegj, Validators.required],
    });
    this.resServ.fizetesTokebol(addAr);
    this.attrServ.fizetesEsszenciabol(addEssz);
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
