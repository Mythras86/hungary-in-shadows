import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor(
    private fb: FormBuilder,
  ) { }

  attributesForm!: FormGroup;

  createAttributes(): FormGroup {
    const attributes = {
      //fizikai
      fizEro: [1, Validators.required],
      fizEroMod: [0, Validators.required],
      fizGyo: [1, Validators.required],
      fizGyoMod: [0, Validators.required],
      fizUgy: [1, Validators.required],
      fizUgyMod: [0, Validators.required],
      fizAll: [1, Validators.required],
      fizAllMod: [0, Validators.required],
      //asztrál
      asztEro: [1, Validators.required],
      asztEroMod: [0, Validators.required],
      asztGyo: [1, Validators.required],
      asztGyoMod: [0, Validators.required],
      asztUgy: [1, Validators.required],
      asztUgyMod: [0, Validators.required],
      asztAll: [1, Validators.required],
      asztAllMod: [0, Validators.required],
      //speciális
      magia: [0, Validators.required],
      magiaMod: [0, Validators.required],
      esszencia: [6, Validators.required],
      esszenciaMod: [0, Validators.required],
      kockatartalek: [1, Validators.required],
      kockatartalekMod: [0, Validators.required],
      kezdemenyezes: [1, Validators.required],
      kezdemenyezesMod: [1, Validators.required],
    };
    return this.attributesForm = this.fb.group(attributes);
  };

}
