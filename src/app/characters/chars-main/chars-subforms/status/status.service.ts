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
      astral: [0, Validators.required],
      body: [0, Validators.required],
    };
    return this.statusForm = this.fb.group(status);
  }

}
