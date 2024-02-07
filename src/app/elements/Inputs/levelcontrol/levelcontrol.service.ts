import { Injectable } from '@angular/core';
import { ModalService } from '../../modals/modal.service';
import { LevelcontrolComponent } from './levelcontrol.component';
import { FormControl } from '@angular/forms';
import { ResourcesService } from 'src/app/characters/chars-subforms/resources/resources.service';

@Injectable({
  providedIn: 'root'
})
export class LevelcontrolService {

  constructor(
    private modalServ: ModalService,
    private resS: ResourcesService
    ) { }

    buttonAction(
      fejlec: string,
      megjegyzes: any,
      lepes: number,
      valto: number,
      tokeKtsg: number,
      karmaKtsg: number,
      forrasControl: any,
      egysegF: string,
      celControl: any,
      egysegC: string,
      minErtek: number,
      maxErtek: number,
      ) {
        this.modalServ.openModal(LevelcontrolComponent, {
        fejlec: fejlec,
        megjegyzes: megjegyzes,
        lepes: lepes,
        valto: valto,
        tokeKtsg: tokeKtsg,
        karmaKtsg: karmaKtsg,
        forrasControl: forrasControl,
        egysegF: egysegF,
        celControl: celControl,
        egysegC: egysegC,
        minErtek: minErtek,
        maxErtek: maxErtek,
      }).subscribe(
        w => this.updateData(w[0], w[1], w[2], w[3], w[4]),
      );
    }

    updateData(valtozas:number, karmaKtsg: number, tokeKtsg: number, valto: number, celControl:FormControl): any[] {
      return [
        // kifizetés
        this.resS.payKarma(valtozas*karmaKtsg),
        this.resS.payToke(valtozas*tokeKtsg),
        // értékszerzés
        celControl.patchValue(celControl.value + valtozas*valto)
      ];
    }

}
