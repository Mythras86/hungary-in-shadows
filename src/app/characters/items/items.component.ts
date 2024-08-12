import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';
import { ItemsService } from './items.service';
import { ItemsModel } from './items.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(
    public s: ItemsService,
    public select: ItemSelectService,
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

  lvlUp(item: ItemsModel): void {

  }

  changePlace(item: ItemsModel, newPlace: string): void {

  }

  ngOnInit(): void {
    this.items.valueChanges.subscribe(
      ()=> console.log(0)
    );
  }
}
