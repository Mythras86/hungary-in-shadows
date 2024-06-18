import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailsFG } from './details.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(
    private fb: FormBuilder,
  ) { }

  detailsForm!: DetailsFG;

  createDetails(): DetailsFG {
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
      return this.detailsForm = this.fb.group(details) as DetailsFG;
  }

  updateDetails(w: any): void {
    this.detailsForm = this.fb.group ({
      //szöveges
      teljesnev: w.teljesnev,
      becenev: w.becenev,
      alnev: w.alnev,
      testalkat: w.testalkat,
      hajstilus: w.hajstilus,
      //értékválasztó
      nem: w.nem,
      dns: w.dns,
      anyanyelv: w.anyanyelv,
      eletkor: w.eletkor,
      magassag: w.magassag,
      testsuly: w.testsuly,
      //szín
      szemszin: w.szemszin,
      hajszin: w.hajszin,
      szorszin: w.szorszin,
      borszin: w.borszin,
      kedvencszin: w.kedvencszin,
      //hosszú szöveg
      felelem: w.felelem,
      osztonzo: w.osztonzo,
      gyulolet: w.gyulolet,
      kedvenc: w.kedvenc,
      irtozat: w.irtozat,
      vonzalom: w.vonzalom,
      megjelenes: w.megjelenes
    }) as DetailsFG;
  }

  getFc(fcName: string):any {
    return this.detailsForm.get(fcName);
  }
}
