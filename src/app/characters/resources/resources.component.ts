import { Component, OnInit } from '@angular/core';
import {ResourcesService } from './resources.service';
import { karmaUtil, resInterface, tokeUtil } from './resources-utility';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { LevelcontrolComponent } from 'src/app/elements/levelcontrol/levelcontrol.component';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  constructor(
    public s: ResourcesService,
    private modalS: ModalService,
  ) {
    this.karmaUtil = karmaUtil;
    this.tokeUtil = tokeUtil;
    this.szabadKarma = s.getSzabadKarma();
    this.szabadToke = s.getSzabadToke();
  }

  karmaUtil: Array<resInterface> = [];
  tokeUtil: Array<resInterface> = [];
  szabadKarma: number = 0;
  szabadToke: number = 0;

  exchangeKarma():void {
    this.modalS.openModal(LevelcontrolComponent, {
      fejlec: 'Karmából Tőke vásárlás',
      megjegyzes: 'K 1 => 7500 NY',
      lepes: 10,
      valto: 7500,
      tokeKtsg: 0,
      karmaKtsg: 1,
      esszKtsg: 0,
      celErtek: this.s.getSzabadToke(),
      egyseg: 'NY',
      minErtek: 0,
      maxErtek: this.s.getSzabadKarma(),
      }).subscribe(
        w => this.updateKarma(w)
      );
    }

    updateKarma(valtozas: number): void {
      // kifizetés
      this.s.payKarma(valtozas);
      // értékszerzés
      this.s.getToke(valtozas*7500);
    }

  exchangeToke():void {
    this.modalS.openModal(LevelcontrolComponent, {
      fejlec: 'Tőkéből Karma vásárlás',
      megjegyzes: '7500 NY => K 1',
      lepes: 10,
      valto: 1,
      tokeKtsg: 7500,
      karmaKtsg: 0,
      esszKtsg: 0,
      celErtek: this.s.getSzabadKarma(),
      egyseg: 'K',
      minErtek: 0,
      maxErtek: this.s.getSzabadToke(),
      }).subscribe(
        w => this.updateToke(w)
      );
    }

    updateToke(valtozas: number): void {
      // kifizetés
      this.s.payToke(valtozas*7500);
      // értékszerzés
      this.s.getKarma(valtozas);
    }


  ngOnInit(): void {
    this.s.resourcesForm.valueChanges.subscribe(
      ()=> {
        this.szabadKarma = this.s.getSzabadKarma(),
        this.szabadToke = this.s.getSzabadToke()
      }
    )
  }
}
