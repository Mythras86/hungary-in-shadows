import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        kedvencszin: ['', Validators.required],
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
}
