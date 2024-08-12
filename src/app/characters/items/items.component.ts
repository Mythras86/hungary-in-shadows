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
    this.modalS.openModal(LevelcontrolComponent, {
    fejlec: item.nev,
    megjegyzes: item.leiras,
    lepes: item.maxSzint!-1,
    valto: 1,
    tokeKtsg: item.tokeKtsgPerSzint,
    karmaKtsg: item.karmaKtsgPerSzint,
    esszKtsg: item.esszenciaKtsgPerSzint,
    celErtek: this.s.getFc(i, 'szint')?.value,
    egyseg: ' Szint',
    minErtek: this.s.getFc(i, 'szint')?.value,
    maxErtek: item.maxSzint,
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
      this.resS.payToke(valtozas*item.tokeKtsgPerSzint);
    }
    if (item.karmaKtsgPerSzint) {
      this.resS.payKarma(valtozas*item.karmaKtsgPerSzint);
    }
  }

  changePlace(i: number, newPlace: string): void {
    const form = (this.s.itemsForm.get('items') as FormArray).at(i).get('elhelyezes');
    form?.patchValue(newPlace)
    console.log(newPlace)
    console.log(this.items.value)

  }

  ngOnInit(): void {
    this.items.valueChanges.subscribe(
      ()=> this.getHelyek()
    );
  }
}
