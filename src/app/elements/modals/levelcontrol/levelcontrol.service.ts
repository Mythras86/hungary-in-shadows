import { Injectable } from '@angular/core';
import { ModalService } from '../modal.service';
import { LevelcontrolComponent } from './levelcontrol.component';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LevelcontrolService {

  constructor(
    private modalServ: ModalService,
    ) { }

    buttonAction(
      nev: string,
      megjegyzes: any,
      jutalom: number,
      lepes: number,
      egyseg: string,
      ktsg: number,
      forrasErtekUtv: any,
      ellenErtekUtv: any,
      minErtek: number,
      maxErtek: number,
      ) {
        this.modalServ.openModal(LevelcontrolComponent, {
        nev: nev,
        megjegyzes: megjegyzes,
        jutalom: jutalom,
        lepes: lepes,
        egyseg: egyseg,
        ktsg: ktsg,
        forrasErtekUtv: forrasErtekUtv,
        ellenErtekUtv: ellenErtekUtv,
        minErtek: minErtek,
        maxErtek: maxErtek,
      }).subscribe(
        w => this.updateData(w, jutalom, ktsg, forrasErtekUtv, ellenErtekUtv),
      );
    }

    updateData(w: number, jutalom: number, ktsg: number, forras: FormControl, ellenoldal: FormControl): void[] {
      return [
        // jutalom
        forras.patchValue(forras.value + w*jutalom),
        // kifizetés
        ellenoldal.patchValue(ellenoldal.value - w*ktsg)
      ];
    }

}
