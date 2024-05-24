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
      fizGyo: [1, Validators.required],
      fizUgy: [1, Validators.required],
      fizKit: [1, Validators.required],
      //asztrál
      asztEro: [1, Validators.required],
      asztGyo: [1, Validators.required],
      asztUgy: [1, Validators.required],
      asztKit: [1, Validators.required],
      //speciális
      kockatartalek: [0, Validators.required],
      magia: [0, Validators.required],
      chi: [0, Validators.required],
      cyberCapacity: [0, Validators.required],
      //konstans
      esszencia: [6, Validators.required],
    };
    return this.attributesForm = this.fb.group(attributes);
  }

  updateAttributes(w: any): void {
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
      kockatartalek: w.kockatartalek,
      magia: w.magia,
      chi: w.chi,
      cyberCapacity: w.cyberCapacity,
      // konstans
      esszencia: w.esszencia,
    });
  }

  getFc(fcName: string):any {
    return this.attributesForm.get(fcName);
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
