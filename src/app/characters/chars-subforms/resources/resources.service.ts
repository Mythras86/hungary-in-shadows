import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(
    private fb: FormBuilder,
  ) {}

  resourcesForm!: FormGroup;

  createResources(): FormGroup {
    const resources = {
      alapKarma: [200, Validators.required],
      szerzettKarma: [0, Validators.required],
      elkoltottKarma: [0, Validators.required],

      alapToke: [50000, Validators.required],
      szerzettToke: [0, Validators.required],
      elkoltottToke: [0, Validators.required],

    };
    return this.resourcesForm = this.fb.group(resources);
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
    });
  }

  getFc(fcName: string):any {
    return this.resourcesForm.get(fcName);
  }

  payKarma(ertek: number):void {
    this.getFc('elkoltottKarma')?.patchValue(this.getFc('elkoltottKarma').value - ertek);
  }

  getKarma(ertek: number):void {
    this.getFc('szerzettKarma')?.patchValue(this.getFc('szerzettKarma').value + ertek);
  }

  payToke(ertek: number):void {
    this.getFc('elkoltottToke')?.patchValue(this.getFc('elkoltottToke').value - ertek);
  }

  getToke(ertek: number):void {
    this.getFc('szerzettToke')?.patchValue(this.getFc('szerzettToke').value + ertek);
  }

  getSzabadKarma(): number {
    return this.getFc('alapKarma')?.value + this.getFc('szerzettKarma')?.value - this.getFc('elkoltottKarma')?.value;
  }

  getSzabadToke(): number {
    return this.getFc('alapToke')?.value + this.getFc('szerzettToke')?.value - this.getFc('elkoltottToke')?.value;
  }

}
