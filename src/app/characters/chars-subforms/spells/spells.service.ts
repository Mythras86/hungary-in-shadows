import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';

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

  addSpell(addId: string, addNev: string, addCsop: string, addTipus: string, addCelszam: string,
    addHatotav: string, addCelpontok: string, addHatoido: string, addKifaradas: string, addMegj: string): void {
    if (addNev == null) {
      return;
    }
    const spell = this.fb.group({
      _id: [addId, Validators.required],
      nev: [addNev, Validators.required],
      csoport: [addCsop, Validators.required],
      tipus: [addTipus, Validators.required],
      szint: [1, Validators.required],
      celpontok: [addCelpontok, Validators.required],
      hatotav: [addHatotav, Validators.required],
      celszam: [addCelszam, Validators.required],
      hatoido: [addHatoido, Validators.required],
      kifaradas: [addKifaradas, Validators.required],
      megjegyzes: [addMegj, Validators.required],
    });
    this.resServ.fizetesTokebol(1000);
    this.resServ.fizetesKarmabol(2);
    (this.spellsForm.get('spells') as FormArray).push(spell);
  }

  removeSpell(i:number): void {
    const szint = (this.spellsForm.get('spells') as FormArray).at(i).get('szint')?.value;
    this.resServ.fizetesTokebol(-1000*szint);
    this.resServ.fizetesKarmabol(-2*szint);
    (this.spellsForm.get('spells') as FormArray).removeAt(i);
  }

  getFcArr(i:number, fcName:string) {
    const spell = ((this.spellsForm.get('spells') as FormArray).at(i) as FormGroup).get(fcName);
    return spell;
  }

}
