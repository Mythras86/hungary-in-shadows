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
    ) { }

    public fejlec: string = '';
    public megjegyzes: any = '';
    public lepes: number = 0;
    public valto: number = 0;
    public tokeKtsg: number = 0;
    public karmaKtsg: number = 0;
    public forrasControl!: FormControl;
    public egysegF: string = '';
    public celControl!: FormControl;
    public egysegC: string = '';
    public minErtek: number = 0;
    public maxErtek: number = 0;

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
        w => this.updateData(w),
      );
    }

    updateData(w:number): number {
      return w;
    }

}
