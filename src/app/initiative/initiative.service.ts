import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { playerModel } from './player.model';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {

  constructor(
    private fb: FormBuilder,
  ) { }

  initForm!: FormGroup;

  public get players(): FormArray | null | any {
    if(!this.initForm) {
      return null;
    }
    return this.initForm.controls['players'] as FormArray;
  }

  createInitiative(): FormGroup {
    const players = {
      counter: [1],
      players: this.fb.array([]),
    };
    return this.initForm = this.fb.group(players);
  }

  getCounter():number {
    return this.initForm.get('counter')?.value;
  }

  getFc(i:number, fcName:string): any {
    const playerPath = this.players.at(i).get(fcName);
    return playerPath;
  }

  nextRound():void {
    const form = this.initForm.get('counter');
    form?.patchValue(form.value+1);
  }

  reset(): void {
    this.initForm.get('counter')?.setValue(1);
    this.players.clear();
  }

  addPlayer(p: playerModel): void {
    const player = this.fb.group({
      nev: [p.nev],
      pancel: [p.pancel],
      init: [0],
      ap: [p.apPerTurn],
      apPerTurn: [p.apPerTurn],
      alapTulSzint: [p.alapTulSzint],
      szakTulSzint: [p.szakTulSzint],
      szakertelemSzint: [p.szakertelemSzint],
      szakteruletSzint: [p.szakteruletSzint],
      asztralisAllapot: [0],
      fizikaiAllapot: [0],
    });
    this.players.push(player);
  }

  removePlayer(i:number): void {
    this.players.removeAt(i);
  }

  setStatus(value: number, i: number, fcName: string):void {
    this.players.at(i).get(fcName)?.patchValue(value);
  }

  spendAp(i: number):void {
    const ap = this.players.at(i).get('ap');
    const inpValue = +(<HTMLInputElement>document.getElementById('buttonAp'+i)).value;
    ap?.patchValue(ap.value-inpValue);
  }

  setInit(i: number):void {
    const init = this.players.at(i).get('init');
    const inpValue = +(<HTMLInputElement>document.getElementById('buttonInit'+i)).value;
    const ap = this.players.at(i).get('ap');
    const newInit = inpValue - this.getModifiers(i);
    if (newInit > 0) {
      init?.patchValue(newInit);
      const newAp = Math.floor(newInit/5);
      if (newAp > 0) {
        ap?.patchValue(ap.value+newAp);
      }
    } else {
      init?.patchValue(1);
    }
  }

  getModifiers(i: number): number {
    const asztral = this.players.at(i).get('asztralisAllapot').value;
    const fizikai = this.players.at(i).get('fizikaiAllapot').value;
    let bigger = 0;
    if (asztral >= fizikai) {
      bigger = asztral;
    } else {
      bigger = fizikai;
    }
    if (bigger == 10) {
      return 4;
    }
    if (7 < bigger && bigger <= 9) {
      return 3;
    }
    if (4 < bigger && bigger <= 7) {
      return 2;
    }
    if (2 < bigger && bigger <= 4) {
      return 1;
    }
    return 0;
  }

  nextTurnSub(): void {
    this.initForm.get('counter')?.valueChanges.subscribe(x => {
      this.players.controls.forEach((w: any) => {
        this.newTurn(w);
      })
    })
  }

  newTurn(w: any) {
    w.get('ap').patchValue(
      w.get('ap').value + w.get('apPerTurn').value
    );
  }

}
