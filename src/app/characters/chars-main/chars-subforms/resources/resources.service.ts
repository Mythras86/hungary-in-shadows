import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(
    private fb: FormBuilder,
  ) { }

  resourcesForm!: FormGroup;

  createResources(): FormGroup {
    const resources = {
      elkolthetoKarma: [350, Validators.required],
      elkolthetoToke: [100000, Validators.required],
      elkolthetoTulPont: [10, Validators.required],
      elkolthetoSzakPont: [10, Validators.required],
      elkolthetoMagPont: [0, Validators.required],
    };
    return this.resourcesForm = this.fb.group(resources);
  }

}
