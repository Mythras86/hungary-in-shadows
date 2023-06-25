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

}
