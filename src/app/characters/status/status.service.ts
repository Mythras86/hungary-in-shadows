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
      asztralisAllapot: [0, Validators.required],
      fizikaiAllapot: [0, Validators.required],
      pinhentsegAllapot: [0, Validators.required],
      taplaltsagAllapot: [0, Validators.required],
    };
    return this.statusForm = this.fb.group(status);
  }

  updateStatus(w: any): void {
    this.statusForm = this.fb.group ({
      asztralisAllapot: w.asztralisAllapot,
      fizikaiAllapot: w.fizikaiAllapot,
      pinhentsegAllapot: w.pinhentsegAllapot,
      taplaltsagAllapot: w.taplaltsagAllapot,
    });
  }

  setStatus(i: number, fcName: string):void {
    this.statusForm.get(fcName)?.patchValue(i);
  }

  getFc(fcName: string):any {
    return this.statusForm.get(fcName);
  }

}
