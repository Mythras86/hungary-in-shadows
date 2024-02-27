import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailsService } from '../details/details.service';
import { dnsUtil } from '../details/details-utility';

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
      kockatartalek: [0, Validators.required],
      kockatartalekMod: [0, Validators.required],
      magia: [0, Validators.required],
      magiaMod: [0, Validators.required],
      chi: [0, Validators.required],
      chiMod: [0, Validators.required],
      cyberCapacity: [0, Validators.required],
      cyberCapacityMod: [0, Validators.required],
      //konstans
      esszencia: [6, Validators.required],
      esszenciaMod: [0, Validators.required],
      akcio: [0, Validators.required],
      akcioMod: [0, Validators.required],
      kezdemenyezes: [1, Validators.required],
      kezdemenyezesMod: [0, Validators.required],
    };
    return this.attributesForm = this.fb.group(attributes);
  }

  getFc(fcName: string):any {
    if (this.attributesForm.get(fcName)?.value !== undefined) {
      return this.attributesForm.get(fcName);
    }
    return console.log(fcName)
  }

  getTulErtek(fcName: string): number {
    const ertek = this.attributesForm.get(fcName)?.value
    +this.attributesForm.get(fcName+'Mod')?.value
    +this.getDnsMod(fcName);
    return ertek;
  }

  getDnsMod(fcName: string):number {
    const selDns = this.detailsServ.detailsForm.get('dns')?.value;
    const mod = dnsUtil.filter(x => x.dns == selDns).map(x => x[fcName + "Mod"]);
    if (selDns) {
      if (mod[0] != undefined) {
        return mod[0];
      }
      return 0;
    }
    return 0;
  }

  getAkcio(): number {
    const gyo = this.getTulErtek('fizGyo');
    const int = this.getTulErtek('asztGyo');
    const akcio = Math.floor((gyo+int)/2);
    return akcio;
  }

}
