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
      karmaToSpend: [350, Validators.required],
      moneyToSpend: [100000, Validators.required],
      attrToSpend: [10, Validators.required],
      skillsToSpend: [10, Validators.required],
      magicToSpend: [0, Validators.required],
    };
    return this.resourcesForm = this.fb.group(resources);
  }

}
