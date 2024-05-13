import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { detailsUtil, dnsUtil, nemekUtil, nyelvekUtil } from './details-utility';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(
    private fb: FormBuilder,
  ) { }

  detailsForm!: FormGroup;

  createDetails(): FormGroup {
    const details = {
      // szöveges
        teljesnev: ['', Validators.required],
        becenev: ['', Validators.required],
        alnev: ['', Validators.required],
        testalkat: ['', Validators.required],
        hajstilus: ['', Validators.required],
        // értékválasztó
        nem: ['', Validators.required],
        dns: ['', Validators.required],
        anyanyelv: ['', Validators.required],
        eletkor:[0, Validators.required],
        magassag: [0, Validators.required],
        testsuly: [0, Validators.required],
        // szín
        szemszin: ['#503335', Validators.required],
        hajszin: ['#503335', Validators.required],
        szorszin: ['#503335', Validators.required],
        borszin: ['#ecbcb4', Validators.required],
        kedvencszin: ['#999999', Validators.required],
        // hosszú szöveg
        felelem: ['', Validators.required],
        osztonzo: ['', Validators.required],
        gyulolet: ['', Validators.required],
        kedvenc: ['', Validators.required],
        irtozat: ['', Validators.required],
        vonzalom: ['', Validators.required],
        megjelenes: ['', Validators.required],
      };
      return this.detailsForm = this.fb.group(details);
  }

  getDetailsUtil():any {
    return detailsUtil;
  }

  getFc(fcName: string):any {
    return this.detailsForm.get(fcName);
  }

  getDefault(fcName: string):any {
    const valasztottFaj: string = this.detailsForm.get('dns')?.value;
    if (valasztottFaj !== '') {
      if (fcName == 'eletkor') {
        const defAge: string = dnsUtil.filter(x=>x.dns == valasztottFaj).map(x=>x.defAge)[0];
        return defAge;
      }
      if (fcName == 'magassag') {
        const defHeight: string = dnsUtil.filter(x=>x.dns == valasztottFaj).map(x=>x.defHeight)[0];
        return defHeight;
      }
      if (fcName == 'testsuly') {
        const defWieght: string = dnsUtil.filter(x=>x.dns == valasztottFaj).map(x=>x.defWieght)[0];
        return defWieght;
      }
      if (fcName == 'kepessegek') {
        const kepessegek: Array<any> = dnsUtil.filter(x=>x.dns == valasztottFaj).map(x=>x.defKepessegek)[0];
        return kepessegek;
      }
    }
    return;
  }

  getList(fcName:string):Array<any> {
    if (fcName == 'dns') {
      const genekLista = dnsUtil.map(x => x.dns);
      return genekLista;
    }
    if (fcName == 'nem') {
      return nemekUtil.map(x => x);
    }
    if (fcName == 'anyanyelv') {
      return nyelvekUtil.map(x => x);
    }
    return [];
  }

  fillWithDummy(): void {
    this.getFc('teljesnev').patchValue('Szikla Szilárd');
    this.getFc('becenev').patchValue('Bazalt');
    this.getFc('alnev').patchValue('Kavics');
    this.getFc('testalkat').patchValue('Mackós');
    this.getFc('hajstilus').patchValue('Kopasz');
    this.getFc('nem').patchValue('Férfi');
    this.getFc('dns').patchValue('Ember');
    this.getFc('anyanyelv').patchValue('Magyar');
    this.getFc('eletkor').patchValue('35');
    this.getFc('magassag').patchValue('180');
    this.getFc('testsuly').patchValue('100');
    this.getFc('felelem').patchValue('van');
    this.getFc('osztonzo').patchValue('van');
    this.getFc('gyulolet').patchValue('van');
    this.getFc('kedvenc').patchValue('van');
    this.getFc('irtozat').patchValue('van');
    this.getFc('vonzalom').patchValue('van');
    this.getFc('megjelenes').patchValue('van');
  }


}
