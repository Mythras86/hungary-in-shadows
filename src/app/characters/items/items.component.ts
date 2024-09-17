import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';
import { ItemsService } from './items.service';
import { ItemsModel } from './items.model';
import { LevelcontrolComponent } from 'src/app/elements/levelcontrol/levelcontrol.component';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { ResourcesService } from '../resources/resources.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(
    public s: ItemsService,
    public select: ItemSelectService,
    private modalS: ModalService,
    private resS: ResourcesService,
  ){
    this.helyek = this.getHelyek();
  }

  public get items(): FormArray | null | any {
    if(!this.s.itemsForm) {
      return null;
    }
    return this.s.itemsForm.controls['items'] as FormArray;
  }

  helyek: Array<string> = [];

  getHelyek(): Array<string> {
    const newHelyek: Array<any> =
    [... new Set (this.items.value.flatMap((e: { elhelyezes: string; }) => e.elhelyezes))];
    return this.helyek = newHelyek;
  }

  getPancel(): void {
    const sum = this.items.value
    .filter((x: { elhelyezes: string; })=>x.elhelyezes == 'Viselt')
    .reduce((prev: number, next: { pancel: string | number; }) => prev + +next.pancel, 0);
    console.log(sum)
    this.s.pancel = sum;
  }

  getCsoportok(hely: string): Array<string> {
    const newCsoportok: Array<any> =
    [... new Set (this.items.value.filter((x: { elhelyezes: string; })=>x.elhelyezes == hely)
      .flatMap((e: { csoport: string; }) => e.csoport))];
    return newCsoportok;
  }

  getTipusok(hely: string, csoport: string): Array<string> {
    const newTipusok: Array<any> =
    [... new Set (this.items.value
      .filter((x: { elhelyezes: string; })=>x.elhelyezes == hely)
      .filter((x: { csoport: string; })=>x.csoport == csoport)
      .flatMap((e: { tipus: string; }) => e.tipus))];
    return newTipusok;
  }

  lvlUpItem(i: number, item: ItemsModel):void {
    if (!item) {
      return;
    }
    const szorzo = item.csoport == 'Asztrállények' ? (item.felhasznalasMax!-item.felhasznalt!) : 1
    this.modalS.openModal(LevelcontrolComponent, {
    fejlec: item.nev,
    megjegyzes: item.leiras,
    lepes: (item.maxSzint ? item.maxSzint-1 : 11),
    valto: 1,
    tokeKtsg: item.tokeKtsgPerSzint! * szorzo!,
    karmaKtsg: item.karmaKtsgPerSzint,
    esszKtsg: item.esszenciaKtsgPerSzint,
    celErtek: this.s.getFc(i, 'szint')?.value,
    egyseg: ' Szint',
    minErtek: this.s.getFc(i, 'szint')?.value,
    maxErtek: item.maxSzint ? item.maxSzint : 12,
    }).subscribe(
      w => this.lvlUp(w, i, item)
    );
  }

  lvlUp(valtozas: number, i: number, item: ItemsModel): void {
    const form = this.s.getFc(i, 'szint');
    // értékszerzés
    form?.patchValue(form.value+valtozas);
    // kifizetés
    if (item.tokeKtsgPerSzint) {
      if (item.csoport == 'Asztrállények') {
        this.resS.payToke(valtozas*item.tokeKtsgPerSzint*(item.felhasznalasMax!-item.felhasznalt!));
      } else {
        this.resS.payToke(valtozas*item.tokeKtsgPerSzint);
      }
    }
    if (item.karmaKtsgPerSzint) {
      this.resS.payKarma(valtozas*item.karmaKtsgPerSzint);
    }
  }

  changePlace(i: number, newPlace: string): void {
    const form = (this.s.itemsForm.get('items') as FormArray).at(i).get('elhelyezes');
    form?.patchValue(newPlace);
    this.getPancel();
  }

  addHasznalat(i: number, item: ItemsModel):void {
    const form = (this.s.itemsForm.get('items') as FormArray).at(i).get('felhasznalasMax');
    form?.patchValue(form.value+1);
    if (item.tokeKtsg) {
      if (item.csoport == 'Asztrállények') {
        this.resS.payToke(item.tokeKtsg*item.szint!);
      } else {
        this.resS.payToke(item.tokeKtsg);
      }
    }
    if (item.karmaKtsg) {
      this.resS.payKarma(item.karmaKtsg);
    }
  }

  ngOnInit(): void {
    this.items.valueChanges.subscribe(()=>
      this.getHelyek(),
      this.getPancel(),
      console.log('yes')
    );
  }
}
