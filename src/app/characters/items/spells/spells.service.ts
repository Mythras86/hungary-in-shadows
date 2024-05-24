import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../../resources/resources.service';
import { SpellsModel } from './spells.model';

@Injectable({
  providedIn: 'root'
})
export class SpellsService {

  constructor(
    private fb: FormBuilder,
    private resServ: ResourcesService,
  ) { }

  spellsForm!: FormGroup;

  createSpells(): FormGroup {
    const spells = {
      spells: this.fb.array([]),
    };
    return this.spellsForm = this.fb.group(spells);
  }

  setSpells(dataset: any[]): FormArray {
    const spells = (this.spellsForm.get('spells') as FormArray);
    dataset.forEach(e => {
      spells.push(
        this.fb.group({
          _id: e._id,
          nev: e.nev,
          csoport: e.csoport,
          tipus: e.tipus,
          szint: e.szint,
          celszam: e.celszam,
          hatotav: e.hatotav,
          celpontok: e.celpontok,
          hatoido: e.hatoido,
          kifaradas: e.kifaradas,
          megjegyzes: e.megjegyzes,
        }))
    });
    return spells;
  }

  addSpell(s: SpellsModel): void {
    if (s.nev == null) {
      return;
    }
    const spell = this.fb.group({
      _id: [s._id, Validators.required],
      nev: [s.nev, Validators.required],
      csoport: [s.csoport, Validators.required],
      tipus: [s.tipus, Validators.required],
      szint: [1, Validators.required],
      celpontok: [s.celpontok, Validators.required],
      hatotav: [s.hatotav, Validators.required],
      celszam: [s.celszam, Validators.required],
      hatoido: [s.hatoido, Validators.required],
      kifaradas: [s.kifaradas, Validators.required],
      megjegyzes: [s.megjegyzes, Validators.required],
    });
    this.resServ.payToke(1000);
    this.resServ.payKarma(2);
    (this.spellsForm.get('spells') as FormArray).push(spell);
  }

  removeSpell(i:number): void {
    const szint = (this.spellsForm.get('spells') as FormArray).at(i).get('szint')?.value;
    this.resServ.payToke(-1000*szint);
    this.resServ.payKarma(-2*szint);
    (this.spellsForm.get('spells') as FormArray).removeAt(i);
  }

  getFcArr(i:number, fcName:string) {
    const spell = ((this.spellsForm.get('spells') as FormArray).at(i) as FormGroup).get(fcName);
    return spell;
  }

}
