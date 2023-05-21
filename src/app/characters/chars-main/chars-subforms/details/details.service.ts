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
        teljesnev: ['Farkas Krisztián', Validators.required],
        becenev: ['Mythras', Validators.required],
        alnev: ['Hypo', Validators.required],
        testalkat: ['Szikár', Validators.required],
        hajstilus: ['Vállig érő', Validators.required],
        // értékválasztó
        nem: ['Férfi', Validators.required],
        dns: ['Tünde', Validators.required],
        anyanyelv: ['Magyar', Validators.required],
        eletkor:[36, Validators.required],
        magassag: [183, Validators.required],
        testsuly: [80, Validators.required],
        // szín
        szemszin: ['#503335', Validators.required],
        hajszin: ['#503335', Validators.required],
        szorszin: ['#503335', Validators.required],
        borszin: ['#ecbcb4', Validators.required],
        kedvencszin: ['#00fbff', Validators.required],
        // hosszú szöveg
        felelem: ['Van', Validators.required],
        osztonzo: ['Van', Validators.required],
        gyulolet: ['Van', Validators.required],
        kedvenc: ['Van', Validators.required],
        irtozat: ['Van', Validators.required],
        vonzalom: ['Van', Validators.required],
        megjelenes: ['Van', Validators.required],
      };
      return this.detailsForm = this.fb.group(details);
  }
}
