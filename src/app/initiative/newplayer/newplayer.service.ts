import { Injectable } from '@angular/core';
import { playerModel } from '../player.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { NewplayerComponent } from './newplayer.component';
import { InitiativeService } from '../initiative.service';

@Injectable({
  providedIn: 'root'
})
export class NewplayerService {

  constructor(
    private fb: FormBuilder,
    private modalS: ModalService,
    private initS: InitiativeService,
  ) { }

  newPlayerForm!: FormGroup;

  createNewPlayer(): FormGroup {
    const newPlayer = {
      nev: [''],
      pancel: [null],
      apPerTurn: [null],
      alapTulSzint: [null],
      szakTulSzint: [null],
      szakertelemSzint: [null],
      szakteruletSzint: [null],
    }
    return this.newPlayerForm = this.fb.group(newPlayer);
  }

  newPlayer(
    nev: string,
    pancel: number,
    apPerTurn: number,
    alapTulSzint: number,
    szakTulSzint: number,
    szakertelemSzint: number,
    szakteruletSzint: number,
  ) {
    const newPlayer: playerModel = {
      nev: nev,
      pancel: pancel,
      apPerTurn: apPerTurn,
      alapTulSzint: alapTulSzint,
      szakTulSzint: szakTulSzint,
      szakertelemSzint: szakertelemSzint,
      szakteruletSzint: szakteruletSzint,
    };
    return newPlayer;
  }

  buttonAction() {
    this.modalS.openModal(NewplayerComponent, '').subscribe(
      (w: playerModel) => this.initS.addPlayer(w)
      );
  }

}
