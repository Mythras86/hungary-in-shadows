import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsModel, nevErtekModel } from './items.model';
import { ResourcesService } from '../resources/resources.service';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { SelectItemComponent } from './select-item/select-item.component';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private fb: FormBuilder,
    private modalS: ModalService,

    private resS: ResourcesService,
  ) { }

  itemsForm!: FormGroup;
  pancel: number = 0;

  createItems(): FormGroup {
    const items = {
      items: this.fb.array([]),
    }
    return this.itemsForm = this.fb.group(items);
  }

  newItem(){
    //const ownedItemsId: Array<string> = Object.values(this.items.controls).map((x:any) => x.value).map(x => x.id);
    this.modalS.openModal(SelectItemComponent, '').subscribe(
      w => this.addItem(w)
    );
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
    elhelyezes: ["Raktár", Validators.required],

    //súly
    suly: [item.suly],
    sulySzorzo: [item.sulySzorzo],

    //költségek kumulatív
    tokeKtsg: [item.tokeKtsg != undefined ? item.tokeKtsg : 0 ],
    karmaKtsg: [item.karmaKtsg != undefined ? item.karmaKtsg : 0 ],
    esszenciaKtsg: [item.esszenciaKtsg != undefined ? item.esszenciaKtsg : 0 ],

    //költségek per szint
    tokeKtsgPerSzint: [item.tokeKtsgPerSzint != undefined ? item.tokeKtsgPerSzint : 0 ],
    karmaKtsgPerSzint: [item.karmaKtsgPerSzint != undefined ? item.karmaKtsgPerSzint : 0 ],
    esszenciaKtsgPerSzint: [item.esszenciaKtsgPerSzint != undefined ? item.esszenciaKtsgPerSzint : 0 ],

    //szint és minőség
    szint: [item.szint],
    maxSzint: [item.maxSzint],
    pancel: [item.pancel],

    celszam: [item.celszam],
    celpontokSzama: [item.celpontokSzama],
    hatosugar: [item.hatosugar],

    tavolsag: [item.tavolsag],

    tamadas: [item.tamadas],
    akcio: [item.akcio],
    ero: [item.ero],
    sebzes: [item.sebzes],
    sebKod: [item.sebKod],

    tulajdonsagModosito: this.fb.array(item.tulajdonsagModosito!.map((x: any) =>this.setTulajdonsagModosito(x))),

    //felhasználás pl.: fegyverbe tár, szellem szolgálat, gyógyszeradag, méreg
    felhasznalasNev: [item.felhasznalasNev],
    felhasznalt: [item.felhasznalt],
    felhasznalasMax: [item.felhasznalasMax],
    });
    // pay the cost
    this.resS.payToke(item.tokeKtsg != undefined ? item.tokeKtsg : 0);
    this.resS.payKarma(item.karmaKtsg != undefined ? item.karmaKtsg : 0);
    (this.itemsForm.get('items') as FormArray).push(newitem);
  }

  setItems(items: ItemsModel[]): void {
    if (items == undefined) {
      return;
    }
    const itemsFA = (this.itemsForm.get('items') as FormArray);
    items.forEach(e => {
      itemsFA.push( this.itemsPush(e));
    });
  }

  itemsPush(e: ItemsModel): FormGroup {
    return this.fb.group({
      //alap adatok
      _id: e._id,
      csoport: e.csoport,
      tipus: e.tipus,
      nev: e.nev,
      leiras: e.leiras,
      elhelyezes: e.elhelyezes,

      //költségek kumulatív
      tokeKtsg: e.tokeKtsg,
      karmaKtsg: e.karmaKtsg,
      esszenciaKtsg: e.esszenciaKtsg,

      //súly
      suly: e.suly,
      sulySzorzo: e.sulySzorzo,

      //költségek per szint
      tokeKtsgPerSzint: e.tokeKtsgPerSzint,
      karmaKtsgPerSzint: e.karmaKtsgPerSzint,
      esszenciaKtsgPerSzint: e.esszenciaKtsgPerSzint,

      //szint és minőség
      szint: e.szint,
      maxSzint: e.maxSzint,
      pancel: e.pancel,

      celszam: e.celszam,
      celpontokSzama: e.celpontokSzama,
      hatosugar: e.hatosugar,

      kiegeszitoKorlatozas: this.setkiegeszitoKorlatozas(e.kiegeszitoKorlatozas),
      kiegeszitok: this.setkiegeszitok(e.kiegeszitok),

      tavolsag: e.tavolsag,

      tamadas: e.tamadas,
      akcio: e.akcio,
      ero: e.ero,
      sebzes: e.sebzes,
      sebKod: e.sebKod,

      tulajdonsagModosito: this.fb.array(e.tulajdonsagModosito ? e.tulajdonsagModosito.map(x=> this.setTulajdonsagModosito(x)) : []),

      //felhasználás pl.: e.fegyverbe tár, szellem szolgálat, gyógyszeradag, méreg
      felhasznalasNev: e.felhasznalasNev,
      felhasznalt: e.felhasznalt,
      felhasznalasMax: e.felhasznalasMax,
    });
  }

  setTulajdonsagModosito(x:any=null) {
    x=x || {Z:null}
    return this.fb.group({
      nev: x.nev,
      ertek: x.ertek,
  });
  }


  setkiegeszitoKorlatozas(data: any) {
    if (data == undefined) {
      return;
    }
    this.fb.array(data.map((x: nevErtekModel) => {
      return this.fb.group({
        nev: x.nev,
        ertek: x.ertek,
      });
    }));
  }

  setkiegeszitok(data: any) {
    if (data == undefined) {
      return;
    }
    this.fb.array(data.map((x: ItemsModel) =>
        this.itemsPush(x)
    ));
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
