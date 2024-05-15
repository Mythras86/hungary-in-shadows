import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(
    private fb: FormBuilder,
  ) { }

  statusForm!: FormGroup;

  createStatus(): FormGroup {
    const status = {
      asztralisAllapot: [11, Validators.required],
      fizikaiAllapot: [11, Validators.required],
      pinhentsegAllapot: [4, Validators.required],
      taplaltsagAllapot: [4, Validators.required],
    };
    return this.statusForm = this.fb.group(status);
  }

  updateStatus(w: any): void {
    this.statusForm = this.fb.group ({
      fizikaiAllapot: w.fizikaiAllapot,
      asztralisAllapot: w.asztralisAllapot,
      pinhentsegAllapot: w.pinhentsegAllapot,
      taplaltsagAllapot: w.taplaltsagAllapot,
    });
  }

  getFc(fcName: string):any {
    return this.statusForm.get(fcName);
  }

}
