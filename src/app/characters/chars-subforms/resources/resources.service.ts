import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pairwise, startWith } from 'rxjs';

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
      alapKarma: [200, Validators.required],
      szerzettKarma: [0, Validators.required],
      elkoltottKarma: [0, Validators.required],
      szabadKarma: [0, Validators.required],

      alapToke: [50000, Validators.required],
      szerzettToke: [0, Validators.required],
      elkoltottToke: [0, Validators.required],
      szabadToke: [0, Validators.required],

    };
    return this.resourcesForm = this.fb.group(resources);
  }

  getFc(fcName: string):any {
    return this.resourcesForm.get(fcName);
  }

  payKarma(ertek: number):void {
    const elkoltottKarma = this.resourcesForm.get('elkoltottKarma');
    elkoltottKarma?.patchValue(elkoltottKarma.value - ertek);
  }

  getKarma(ertek: number):void {
    const szerzettKarma = this.resourcesForm.get('szerzettKarma');
    szerzettKarma?.patchValue(szerzettKarma.value + ertek);
  }

  payToke(ertek: number):void {
    const elkoltottToke = this.resourcesForm.get('elkoltottToke');
    elkoltottToke?.patchValue(elkoltottToke.value - ertek);
  }

  getToke(ertek: number):void {
    const szerzettToke = this.resourcesForm.get('szerzettToke');
    szerzettToke?.patchValue(szerzettToke.value + ertek);
  }

}
