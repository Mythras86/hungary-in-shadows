import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DetailsService } from '../details/details.service';
import { dnsUtil } from '../details/details-utility';
import { AttributesFG, AttributesModel } from './attributes.model';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  attributesForm!: AttributesFG;

  constructor(
    private fb: FormBuilder,
    private detailsServ: DetailsService,
  ) { }

  createAttributes(): AttributesFG {
    const attributes = {
      //fizikai
      fizEro: [1, Validators.required],
      fizGyo: [1, Validators.required],
      fizUgy: [1, Validators.required],
      fizKit: [1, Validators.required],
      //asztrál
      asztEro: [1, Validators.required],
      asztGyo: [1, Validators.required],
      asztUgy: [1, Validators.required],
      asztKit: [1, Validators.required],
      //speciális
      magia: [0, Validators.required],
      chiAramlas: [0, Validators.required],
      kiberKapacitas: [0, Validators.required],
      kockatartalek: [0, Validators.required],
      //konstans
      esszencia: [6, Validators.required],
    };
    return this.attributesForm = this.fb.group(attributes) as AttributesFG;
  }

  updateAttributes(w: AttributesModel): void {
    this.attributesForm = this.fb.group ({
      // fizikai
      fizEro: w.fizEro,
      fizGyo: w.fizGyo,
      fizUgy: w.fizUgy,
      fizKit: w.fizKit,
      // asztrál
      asztEro: w.asztEro,
      asztGyo: w.asztGyo,
      asztUgy: w.asztUgy,
      asztKit: w.asztKit,
      // speciális
      magia: w.magia,
      chiAramlas: w.chiAramlas,
      kiberKapacitas: w.kiberKapacitas,
      kockatartalek: w.kockatartalek,
      // konstans
      esszencia: w.esszencia,
    }) as AttributesFG;
  }

  getFc(fcName: string): FormControl {
    return this.attributesForm.get(fcName) as FormControl;
  }

  getMod(fcName: string):number {
    return 0;
  }

  getTulErtek(fcName: string): number {
    const ertek = this.attributesForm.get(fcName)?.value
    +this.getMod(fcName);
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
