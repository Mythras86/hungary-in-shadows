import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {

  constructor(
    private fb: FormBuilder,
  ) { }

  initForm!: FormGroup;

  createInitiative(): FormGroup {
    const players = {
      counter: [0],
      players: this.fb.array([]),
    };
    return this.initForm = this.fb.group(players);
  }

  nextRound():void {
    const form = this.initForm.get('counter');
    form?.patchValue(form.value+1);
  }

  reset(): void {
    this.initForm.get('counter')?.setValue(0);
    (this.initForm.get('players') as FormArray).clear();
  }

  addPlayer(): void {
    const player = this.fb.group({
      nev: ['Grunt'],
      pancel: [0],
      init: [0],
      ap: [0],
      alapTulSzint: [0],
      szakTulSzint: [0],
      szakertelemSzint: [0],
      szakteruletSzint: [0],
      asztralisAllapot: [0],
      fizikaiAllapot: [0]
    });
    (this.initForm.get('players') as FormArray).push(player);
  }

  removePlayer(i:number): void {
    (this.initForm.get('players') as FormArray).removeAt(i);
  }

  setStatus(value: number, i: number, fcName: string):void {
    ((this.initForm.get('players') as FormArray).at(i) as FormGroup).get(fcName)?.patchValue(value);
  }

  getCounter():number {
    return this.initForm.get('counter')?.value;
  }

  getFc(i:number, fcName:string): any {
    const playerPath = ((this.initForm.get('players') as FormArray).at(i) as FormGroup).get(fcName);
    return playerPath;
  }

}
