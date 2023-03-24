import { Injectable } from '@angular/core';
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
      basekarma: [250, Validators.required],
      gainedkarma: [50, Validators.required],
      karmaonattr: [0, Validators.required],
      karmaonskills: [0, Validators.required],
      karmaonmoney: [0, Validators.required],
      gainedmoney: [50000, Validators.required],
      karmaonmagic: [0, Validators.required],
    };
    return this.resourcesForm = this.fb.group(resources);
  }
}
