import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailsService } from '../details/details.service';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor(
    private fb: FormBuilder,
    private detailsServ: DetailsService,
  ) { }

  attributesForm!: FormGroup;

  createAttributes(): FormGroup {
    const attributes = {
      //fizikai
      fizEro: [1, Validators.required],
      fizEroMod: [0, Validators.required],
      fizGyo: [1, Validators.required],
      fizGyoMod: [0, Validators.required],
      fizUgy: [1, Validators.required],
      fizUgyMod: [0, Validators.required],
      fizAll: [1, Validators.required],
      fizAllMod: [0, Validators.required],
      //asztrál
      asztEro: [1, Validators.required],
      asztEroMod: [0, Validators.required],
      asztGyo: [1, Validators.required],
      asztGyoMod: [0, Validators.required],
      asztUgy: [1, Validators.required],
      asztUgyMod: [0, Validators.required],
      asztAll: [1, Validators.required],
      asztAllMod: [0, Validators.required],
      //speciális
      magia: [0, Validators.required],
      magiaMod: [0, Validators.required],
      esszencia: [6, Validators.required],
      esszenciaMod: [0, Validators.required],
      kockatartalek: [1, Validators.required],
      kockatartalekMod: [0, Validators.required],
      kezdemenyezes: [1, Validators.required],
      kezdemenyezesMod: [0, Validators.required],
    };
    return this.attributesForm = this.fb.group(attributes);
  }

  getTulErtek(fcName: string): number {
    const ertek = this.attributesForm.get(fcName)?.value +this.attributesForm.get(fcName+'Mod')?.value;
    if (ertek < 1) {
      return 1;
    }
    return ertek;
  }

  getKezdKocka():number {
    const kezdKocka = this.attributesForm.get('kezdemenyezes')?.value +this.attributesForm.get('kezdemenyezesMod')?.value;
    if (kezdKocka < 1) {
      return 1;
    }
    return kezdKocka;
  }

  getKezdKonst():number {
    const fizGyo = this.attributesForm.get('fizGyo')?.value +this.attributesForm.get('fizGyoMod')?.value;
    const asztGyo = this.attributesForm.get('asztGyo')?.value +this.attributesForm.get('asztGyoMod')?.value;
    const kezdKonst = Math.floor((fizGyo+asztGyo)/2);
    if (kezdKonst < 1) {
      return 1;
    }
    return kezdKonst;
  }

  getTamadoEro():number {
    const fizEro = this.attributesForm.get('fizEro')?.value +this.attributesForm.get('fizEroMod')?.value;
    const fizGyo = this.attributesForm.get('fizGyo')?.value +this.attributesForm.get('fizGyoMod')?.value;
    const fizUgy = this.attributesForm.get('fizUgy')?.value +this.attributesForm.get('fizUgyMod')?.value;
    const meretKat = Math.floor(this.detailsServ.detailsForm.get('magassag')?.value/50);
    const tamadoEro = Math.floor((fizGyo + fizUgy + meretKat)/2);
    if (tamadoEro < 1) {
      return 1;
    }
    return tamadoEro;
  }


}
