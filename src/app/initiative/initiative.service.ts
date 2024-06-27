import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { playerModel } from './player.model';
import { StatusmonitorService } from '../characters/status/statusmonitor/statusmonitor.service';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {

  constructor(
    private fb: FormBuilder,
    public statusMonS: StatusmonitorService
  ) { }

  initForm!: FormGroup;
  turn: number = 1;
  phase: number = 1;

  public get players(): FormArray | null | any {
    if(!this.initForm) {
      return null;
    }
    return this.initForm.controls['players'] as FormArray;
  }

  createInitiative(): FormGroup {
    const players = {
      players: this.fb.array([]),
    };
    return this.initForm = this.fb.group(players);
  }

  getFc(i:number, fcName:string): any {
    const playerPath = this.players.at(i).get(fcName);
    return playerPath;
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
      status: [1],
    });
    this.players.push(player);
  }

  removePlayer(i:number): void {
    this.players.removeAt(i);
  }

  setStatus(value: number, i: number, fcName: string):void {
    this.players.at(i).get(fcName)?.patchValue(value);
  }

  setInit(i: number):void {
    const inpValue = +(<HTMLInputElement>document.getElementById('buttonInit'+i)).value;
    if (inpValue == (null  || '' || undefined || 0)) {
      return
    }
    const init = this.players.at(i).get('init');
    const ap = this.players.at(i).get('ap');
    const status = this.players.at(i).get('status');
    const result = inpValue - this.modifiers(i);
    if (result > 0) {
      init?.patchValue(result);
      ap?.patchValue(ap.value + Math.floor(result/6));
      status.patchValue(2);
    } else {
      init?.patchValue(1);
      status.patchValue(2);
    }
    this.checkInitPhase();
  }

  checkInitPhase():void {
    const players = (this.initForm.get('players') as FormArray);
    const status: Array<number> = Object.values(players.controls).map(x => x.value).map(x => x.status);
    const ap: Array<number> = Object.values(players.controls).map(x => x.value).map(x => x.ap);

    if (status.every(x=>x == 2)){
      this.phase = 2;
    }
    if (ap.every(x=>x < 1) && status.every(x=>x == 2)) {
      this.callNextTurn();
    }
  }

  spendAp(i: number):void {
    const inpValue = +(<HTMLInputElement>document.getElementById('buttonAp'+i)).value;
    if (inpValue == (null  || '' || undefined || 0)) {
      return
    }
    const ap = this.players.at(i).get('ap');
    const status = this.players.at(i).get('status');
    const result = ap.value-inpValue;
    if (result <= 0) {
      ap.patchValue(result);
      status.patchValue(3);
    } else {
      ap.patchValue(result);
    }
    this.checkActionPhase();
  }

  checkActionPhase() {
    const players = (this.initForm.get('players') as FormArray);
    const ap: Array<number> = Object.values(players.controls).map(x => x.value).map(x => x.ap);
    const status: Array<number> = Object.values(players.controls).map(x => x.value).map(x => x.status);

    if (status.every(x=>x == 3) || ap.every(x=>x < 1)){
      this.callNextTurn()
    }
  }

  callNextTurn() {
    this.players.controls.forEach((w: any) => {
      w.get('ap').patchValue(w.get('ap').value + w.get('apPerTurn').value);
      w.get('status').setValue(1);
    })
    this.turn = this.turn+1;
    this.phase = 1;
  }

  modifiers(i: number): number {
    return this.statusMonS.getModifiers(this.getFc(i, 'asztralisAllapot'), this.getFc(i, 'fizikaiAllapot'));
  }

}
