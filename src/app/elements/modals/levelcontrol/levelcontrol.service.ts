import { Injectable } from '@angular/core';
import { ModalService } from '../modal.service';
import { LevelcontrolComponent } from './levelcontrol.component';

@Injectable({
  providedIn: 'root'
})
export class LevelcontrolService {

  constructor(
    private modalServ: ModalService,
    ) { }

  sendData(
    fejlec: string,
    megjegyzes: string,
    valtErtekUtv: any,
    jutalom: number,
    lepes: number,
    ktsg: number,
    ellenErtekUtv: any,
    minErtek: number,
    maxErtek: number
    ) {
    this.modalServ.openModal(LevelcontrolComponent, {
      fejlec: fejlec,
      megjegyzes: megjegyzes,
      valtErtekUtv: valtErtekUtv,
      jutalom: jutalom,
      lepes: lepes,
      ktsg: ktsg,
      ellenErtekUtv: ellenErtekUtv,
      minErtek: minErtek,
      maxErtek: maxErtek
      }).subscribe(
      w => this.updateData(valtErtekUtv, w[0], ellenErtekUtv, w[1])
    );
  }

  updateData(valtErtekUtv:any, valtErtek:number, ellenErtekUtv:any, ellenErtek:number ) {
    return [
      valtErtekUtv.patchValue(valtErtek),
      ellenErtekUtv.patchValue(ellenErtek),
    ]
  }

}
