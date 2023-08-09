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
      elkolthetoKarma: [400, Validators.required],
      elkolthetoToke: [200000, Validators.required],
      karmabolToke: [0, Validators.required],
    };
    return this.resourcesForm = this.fb.group(resources);
  }

  getFc(fcName: string):any {
    return this.resourcesForm.get(fcName);
  }

  karmabolTokeChangeDetector() {
    const karmabolToke = this.resourcesForm.get('karmabolToke');
    const elkolthetoToke = this.resourcesForm.get('elkolthetoToke');
    if (this.resourcesForm) {
      karmabolToke?.valueChanges.pipe(startWith(karmabolToke?.value), pairwise())
      .subscribe(([prev, next]: [any, any]) => {
        return elkolthetoToke?.patchValue(elkolthetoToke?.value+(next-prev)*7500)
      });
    }
    return;
  }

  fizetesKarmabol(ertek: number):void {
    const elkolthetoKarma = this.resourcesForm.get('elkolthetoKarma');
    const ujErtek = elkolthetoKarma?.patchValue(elkolthetoKarma.value - ertek);
    return ujErtek;
  }

  fizetesTokebol(ertek: number):void {
    const elkolthetoToke = this.resourcesForm.get('elkolthetoToke');
    const ujErtek = elkolthetoToke?.patchValue(elkolthetoToke.value - ertek);
    return ujErtek;
  }

}
