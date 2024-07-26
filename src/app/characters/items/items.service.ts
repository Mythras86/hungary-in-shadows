import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsModel, TamadasModel, TavolsagModel, nevErtekModel } from './items.model';
import { ResourcesService } from '../resources/resources.service';
import { AttributesService } from '../attributes/attributes.service';
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
    private attrS: AttributesService,

  ) { }

  itemsForm!: FormGroup;

  createItems(): FormGroup {
    const items = {
      armors: this.fb.array([]),
      armorAddons: this.fb.array([]),
      weapons: this.fb.array([]),
      weaponAddons: this.fb.array([]),
      items: this.fb.array([]),
      cybers: this.fb.array([]),
      explosives: this.fb.array([]),
      artifacts: this.fb.array([]),
      spells: this.fb.array([]),
      spirits: this.fb.array([]),
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
    faName: [item.faName, Validators.required],
    nev: [item.nev, Validators.required],
    leiras: [item.leiras, Validators.required],

    //súly
    suly: [item.suly],

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
    this.resS.payToke(item.tokeKtsg != undefined ? item.tokeKtsg : 0);
    this.resS.payKarma(item.karmaKtsg != undefined ? item.karmaKtsg : 0);
    (this.itemsForm.get(item.faName) as FormArray).push(newitem);
  }

  setItems(items: ItemsModel[], faName: string): void {
    if (items == undefined) {
      return;
    }
    const itemsFA = (this.itemsForm.get(faName) as FormArray);
    items.forEach(e => {
      itemsFA.push( this.itemsPush(e));
    });
  }

  itemsPush(e: any): FormGroup {
    return this.fb.group({
      //alap adatok
      _id: e._id,
      csoport: e.csoport,
      tipus: e.tipus,
      faName: e.faName,
      nev: e.nev,
      leiras: e.leiras,

      //költségek kumulatív
      tokeKtsg: e.tokeKtsg,
      karmaKtsg: e.karmaKtsg,
      esszenciaKtsg: e.esszenciaKtsg,

      //súly
      suly: e.suly,

      //költségek per szint
      tokeKtsgPerSzint: e.tokeKtsgPerSzint,
      karmaKtsgPerSzint: e.karmaKtsgPerSzint,
      esszenciaKtsgPerSzint: e.esszenciaKtsgPerSzint,

      //szint és minőség
      szint: e.szint,
      maxSzint: e.maxSzint,

      celszam: e.celszam,
      celpontokSzama: e.celpontokSzama,
      hatosugar: e.hatosugar,

      kiegeszitoKorlatozas: this.setkiegeszitoKorlatozas(e.kiegeszitoKorlatozas),
      kiegeszitok: this.setkiegeszitok(e.kiegeszitok),

      tavolsag: this.setTavolsag(e.tavolsag),

      tamadas: this.setTamadas(e.tamadas),

      tulajdonsagModosito: this.setTulajdonsagModosito(e.tulajdonsagModosito),

      //felhasználás pl.: e.fegyverbe tár, szellem szolgálat, gyógyszeradag, méreg
      felhasznalasNev: e.felhasznalasNev,
      felhasznalt: e.felhasznalt,
      felhasznalasMax: e.felhasznalasMax,
    });
  }

  setTavolsag(data: any) {
    if (data == undefined) {
      return;
    }
    this.fb.array(data.map((x: TavolsagModel) => {
      return this.fb.group({
        nev: x.nev,
        ertek: x.ertek,
        modosito: x.modosito,
      });
    }));
  }

  setTamadas(data: any) {
    if (data == undefined) {
      return;
    }
    this.fb.array(data.map((x: TamadasModel) => {
      return this.fb.group({
        nev: x.nev,
        akcio: x.akcio,
        ero: x.ero,
        sebzes: x.sebzes,
        sebKod: x.sebKod,
      });
    }));
  }

  setTulajdonsagModosito(data: any) {
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
    this.setItems(w.armors, 'armors');
    this.setItems(w.weapons, 'weapons');
    this.setItems(w.items, 'items');
    this.setItems(w.cybers, 'cybers');
    this.setItems(w.explosives, 'explosives');
    this.setItems(w.artifacts, 'artifacts');
    this.setItems(w.spells, 'spells');
    this.setItems(w.spirits, 'spirits');
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
