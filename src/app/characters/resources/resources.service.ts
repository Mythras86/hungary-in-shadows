import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesFG } from './resources.model';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(
    private fb: FormBuilder,
  ) { }

  resourcesForm!: ResourcesFG;

  createResources(): ResourcesFG {
    const resources = {
      alapKarma: [200, Validators.required],
      szerzettKarma: [0, Validators.required],
      elkoltottKarma: [0, Validators.required],

      alapToke: [50000, Validators.required],
      szerzettToke: [0, Validators.required],
      elkoltottToke: [0, Validators.required],

    };
    return this.resourcesForm = this.fb.group(resources) as ResourcesFG;
  }

  updateResources(w: any): void {
    this.resourcesForm = this.fb.group ({
      //erőforrások
      alapKarma: w.alapKarma,
      szerzettKarma: w.szerzettKarma,
      elkoltottKarma: w.elkoltottKarma,
      alapToke: w.alapToke,
      szerzettToke: w.szerzettToke,
      elkoltottToke: w.elkoltottToke
    }) as ResourcesFG;
  }

  getFc(fcName: string):any {
    return this.resourcesForm.get(fcName);
  }

  payKarma(ertek: number):void {
    const form = this.getFc('elkoltottKarma');
    form?.patchValue(form.value-ertek);
  }

  getKarma(ertek: number):void {
    const form = this.getFc('szerzettKarma');
    form?.patchValue(form.value+ertek);
  }

  payToke(ertek: number):void {
    const form = this.getFc('elkoltottToke');
    form?.patchValue(form.value-ertek);
  }

  getToke(ertek: number):void {
    const form = this.getFc('szerzettToke');
    form?.patchValue(form.value+ertek);
  }

  getSzabadKarma(): number {
    return this.getFc('alapKarma')?.value + this.getFc('szerzettKarma')?.value + this.getFc('elkoltottKarma')?.value;
  }

  getSzabadToke(): number {
    return this.getFc('alapToke')?.value + this.getFc('szerzettToke')?.value + this.getFc('elkoltottToke')?.value;
  }

}
