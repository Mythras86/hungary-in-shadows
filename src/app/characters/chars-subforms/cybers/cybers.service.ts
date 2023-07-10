import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { AttributesService } from '../attributes/attributes.service';

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
      cyberEssence: [0, Validators.required],
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
    this.resServ.fizetesTokebol(-arVissza);
    (this.cybersForm.get('cybers') as FormArray).removeAt(i);
  }

  getFc(fcName:string) {
    const aR = this.cybersForm.get(fcName);
    return aR;
  }

  getFcArr(i:number, fcName:string) {
    const cyber = ((this.cybersForm.get('cybers') as FormArray).at(i) as FormGroup).get(fcName);
    return cyber;
  }

}
