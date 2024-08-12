import { AbstractControl, FormGroup } from "@angular/forms";

export interface ItemsModel {

  //alap adatok
  _id: string;
  csoport: string;
  tipus: string;
  nev: string;
  leiras: string;
  elhelyezes: string;

  //költségek kumulatív
  tokeKtsg?: number;
  karmaKtsg?: number;
  esszenciaKtsg?: number;

  //súly
  suly?: number;
  sulySzorzo?: number;

  //költségek per szint
  tokeKtsgPerSzint?: number;
  karmaKtsgPerSzint?: number;
  esszenciaKtsgPerSzint?: number;

  //költségek multiplikatív
  tokeKtsgSzorzo?: number;
  karmaKtsgSzorzo?: number;
  esszenciaKtsgSzorzo?: number;

  //szint és minőség
  szint?: number;
  maxSzint?: number;
  pancel?: number;

  celszam?: any;
  celpontokSzama?: number;
  hatosugar?: number;

  kiegeszitoKorlatozas?: Array<nevErtekModel>
  kiegeszitok?: Array<ItemsModel>;

  tavolsag?: any;

  tamadas?: string;
  akcio?: number;
  ero?: number;
  sebzes?: number;
  sebKod?: string;

  tulajdonsagModosito?: Array<nevErtekModel>;

  //felhasználás pl.?: fegyverbe tár, szellem szolgálat, gyógyszeradag, méreg
  felhasznalasNev?: string;
  felhasznalt?: number;
  felhasznalasMax?: number;
}

export interface nevErtekModel {
  nev: string;
  ertek: number;
}

export interface ItemsFG extends FormGroup {
  value: ItemsModel;
  controls: {
    //alap adatok
    _id: AbstractControl;
    csoport: AbstractControl;
    tipus: AbstractControl;
    nev: AbstractControl;
    leiras: AbstractControl;
    elhelyezes: AbstractControl;

    //költségek kumulatív
    tokeKtsg?: AbstractControl;
    karmaKtsg?: AbstractControl;
    esszenciaKtsg?: AbstractControl;

    //súly
    suly?: AbstractControl;
    sulySzorzo?: AbstractControl;

    //költségek per szint
    tokeKtsgPerSzint?: AbstractControl;
    karmaKtsgPerSzint?: AbstractControl;
    esszenciaKtsgPerSzint?: AbstractControl;

    //költségek multiplikatív
    tokeKtsgSzorzo?: AbstractControl;
    karmaKtsgSzorzo?: AbstractControl;
    esszenciaKtsgSzorzo?: AbstractControl;

    //szint és minőség
    szint?: AbstractControl;
    maxSzint?: AbstractControl;
    pancel?: AbstractControl;

    celszam?: AbstractControl;
    celpontokSzama?: AbstractControl;
    hatosugar?: AbstractControl;

    kiegeszitoKorlatozas?: AbstractControl<nevErtekFG[]>;
    kiegeszitok?: AbstractControl<ItemsFG[]>;

    tavolsag?: AbstractControl<number>;

    tamadas?: AbstractControl;
    akcio?: AbstractControl;
    ero?: AbstractControl;
    sebzes?: AbstractControl;
    sebKod?: AbstractControl;

    tulajdonsagModosito?: AbstractControl<nevErtekFG[]>;

    //felhasználás pl.?: fegyverbe tár, szellem szolgálat, gyógyszeradag, méreg
    felhasznalasNev?: AbstractControl;
    felhasznalt?: AbstractControl;
    felhasznalasMax?: AbstractControl;
  }
};

export interface nevErtekFG extends FormGroup {
  value: nevErtekModel;
  controls: {
    nev: AbstractControl;
    ertek: AbstractControl;
  }
};
