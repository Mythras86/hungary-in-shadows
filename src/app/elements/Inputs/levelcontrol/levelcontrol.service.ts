import { Injectable } from '@angular/core';
import { ModalService } from '../../modals/modal.service';
import { LevelcontrolComponent } from './levelcontrol.component';
import { FormControl } from '@angular/forms';
import { ResourcesService } from 'src/app/characters/chars-subforms/resources/resources.service';
import { AttributesService } from 'src/app/characters/chars-subforms/attributes/attributes.service';

@Injectable({
  providedIn: 'root'
})
export class LevelcontrolService {

  constructor(
    private modalServ: ModalService,
    private resS: ResourcesService,
    private attrS: AttributesService
    ) { }

    public fejlec: string = '';
    public megjegyzes: any = '';
    public lepes: number = 0;
    public valto: number = 0;
    public tokeKtsg: number = 0;
    public karmaKtsg: number = 0;
    public esszKtsg: number = 0;
    public celControl!: FormControl;
    public egyseg: string = '';
    public minErtek: number = 0;
    public maxErtek: number = 0;

    buttonAction(
      fejlec: string,
      megjegyzes: any,
      lepes: number,
      valto: number,
      tokeKtsg: number,
      karmaKtsg: number,
      esszKtsg: number,
      celControl: any,
      egyseg: string,
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
        esszKtsg: esszKtsg,
        celControl: celControl,
        egyseg: egyseg,
        minErtek: minErtek,
        maxErtek: maxErtek,
      }).subscribe(
        w => this.updateData(w)
      );
    }

    updateData(valtozas: number): any[] {
      return [
        // kifizetés
        this.resS.payKarma(valtozas*this.karmaKtsg),
        this.resS.payToke(valtozas*this.tokeKtsg),
        this.attrS.getFc('esszenciaMod').patchValue(this.attrS.getFc('esszenciaMod').value-valtozas*this.esszKtsg),
        // értékszerzés
        this.celControl.patchValue(this.celControl.value + valtozas*this.valto)
      ];
    }

}
