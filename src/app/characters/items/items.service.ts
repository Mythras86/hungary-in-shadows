import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsModel } from './items.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private fb: FormBuilder,
  ) { }

  itemsForm!: FormGroup;

  createItems(): FormGroup {
    const items = {
      armors: this.fb.array([]),
      armorAddons: this.fb.array([]),
    }
    return this.itemsForm = this.fb.group(items);
  }

  addItem(item: ItemsModel): void {
    if (item == null) {
      return;
    }
    const newitem = this.fb.group({
    //alap adatok
    _id: [item._id, Validators.required],
    csoport: [item.csoport, Validators.required],
    tipus: [item.tipus, Validators.required],
    nev: [item.nev, Validators.required],
    leiras: [item.leiras, Validators.required],

    //súly
    suly: [item.suly],
    sulySzorzo: [item.sulySzorzo],

    //költségek kumulatív
    tokeKtsg: [item.tokeKtsg],
    karmaKtsg: [item.karmaKtsg],
    esszenciaKtsg: [item.esszenciaKtsg],

    //költségek per szint
    tokeKtsgPerSzint: [item.tokeKtsgPerSzint],
    karmaKtsgPerSzint: [item.karmaKtsgPerSzint],
    esszenciaKtsgPerSzint: [item.esszenciaKtsgPerSzint],

    //költségek multiplikatív
    tokeKtsgSzorzo: [item.tokeKtsgSzorzo],
    karmaKtsgSzorzo: [item.karmaKtsgSzorzo],
    esszenciaKtsgSzorzo: [item.esszenciaKtsgSzorzo],

    //szint és minőség
    szint: [item.szint],
    maxSzint: [item.maxSzint],

    celszam: [item.celszam],
    celpontokSzama: [item.celpontokSzama],
    hatosugar: [item.hatosugar],

    tavolsag: this.fb.array(item.tavolsag!.map((x: any) =>this.setTavolsag(x))),
    tamadas: this.fb.array(item.tamadas!.map((x: any) =>this.setTamadas(x))),
    tulajdonsagModosito: this.fb.array(item.tulajdonsagModosito!.map((x: any) =>this.setTulajdonsagModosito(x))),

    //felhasználás pl.: fegyverbe tár, szellem szolgálat, gyógyszeradag, méreg
    felhasznalasNev: [item.felhasznalasNev],
    felhasznalt: [item.felhasznalt],
    felhasznalasMax: [item.felhasznalasMax],
    });
    // pay the cost
    (this.itemsForm.get(item.csoport) as FormArray).push(newitem);
  }

  setTavolsag(x: any) {

  }

  setTamadas(x: any) {

  }

  setTulajdonsagModosito(x: any) {

  }

  setItems(dataset: any[]): FormArray<any> {
    const items = (this.itemsForm.get('items') as FormArray);
    dataset.forEach(e => {
      items.push(
        this.fb.group({
      //item attributes
    }))
    });
    return items;
  }

  updateItems(w: any): void {
    this.createItems();
    this.setItems(w);
  }

  removeItem(i:number): void {
    // retrieve cost
    (this.itemsForm.get('items') as FormArray).removeAt(i);
  }

  getFc(i:number, fcName:string) {
    const itemPath = ((this.itemsForm.get('items') as FormArray).at(i) as FormGroup).get(fcName);
    return itemPath;
  }

}
