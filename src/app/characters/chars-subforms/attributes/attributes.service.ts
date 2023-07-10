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
      fizKit: [1, Validators.required],
      fizKitMod: [0, Validators.required],
      //asztrál
      asztEro: [1, Validators.required],
      asztEroMod: [0, Validators.required],
      asztGyo: [1, Validators.required],
      asztGyoMod: [0, Validators.required],
      asztUgy: [1, Validators.required],
      asztUgyMod: [0, Validators.required],
      asztKit: [1, Validators.required],
      asztKitMod: [0, Validators.required],
      //speciális
      magia: [0, Validators.required],
      esszencia: [6, Validators.required],
      kockatartalek: [1, Validators.required],
      kezdemenyezes: [1, Validators.required],
    };
    return this.attributesForm = this.fb.group(attributes);
  }

  getFc(fcName: string):any {
    return this.attributesForm.get(fcName);
  }

  getTulErtek(fcName: string): number {
    const ertek = this.attributesForm.get(fcName)?.value +this.attributesForm.get(fcName+'Mod')?.value;
    if (ertek < 1) {
      return 1;
    }
    return ertek;
  }

  getFizikum(): number {
    const fizEro = this.attributesForm.get('fizEro')?.value +this.attributesForm.get('fizEroMod')?.value;
    const fizGyo = this.attributesForm.get('fizGyo')?.value +this.attributesForm.get('fizGyoMod')?.value;
    const fizUgy = this.attributesForm.get('fizUgy')?.value +this.attributesForm.get('fizUgyMod')?.value;
    const fizKit = this.attributesForm.get('fizKit')?.value +this.attributesForm.get('fizKitMod')?.value;
    const fizikum = Math.floor((fizEro + fizGyo + fizKit + fizUgy)/4)
    return fizikum
  }

  getAsztral(): number {
    const asztEro = this.attributesForm.get('asztEro')?.value +this.attributesForm.get('asztEroMod')?.value;
    const asztGyo = this.attributesForm.get('asztGyo')?.value +this.attributesForm.get('asztGyoMod')?.value;
    const asztUgy = this.attributesForm.get('asztUgy')?.value +this.attributesForm.get('asztUgyMod')?.value;
    const asztKit = this.attributesForm.get('asztKit')?.value +this.attributesForm.get('asztKitMod')?.value;
    const asztral = Math.floor((asztEro + asztGyo + asztKit + asztUgy)/4)
    return asztral
  }

  getAkcio(): number {
    const gyo = this.getTulErtek('fizGyo');
    const int = this.getTulErtek('asztGyo');
    const akcio = Math.floor((gyo+int)/2);
    return akcio;
  }


  fizetesEsszenciabol(ertek: number): void {
    const essz = this.getFc('esszenciaMod');
    return essz.patchValue(essz.value-ertek);
  }

}
