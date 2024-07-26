export interface ItemsModel {

  //alap adatok
  _id: string;
  csoport: string;
  tipus: string;
  faName: string;
  nev: string;
  leiras: string;

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

  celszam?: number;
  celpontokSzama?: number;
  hatosugar?: number;

  kiegeszitoKorlatozas?: Array<nevErtekModel>
  kiegeszitok?: Array<ItemsModel>;

  tavolsag?: Array<TavolsagModel>;

  tamadas?: Array<TamadasModel>;

  tulajdonsagModosito?: Array<nevErtekModel>;

  //felhasználás pl.?: fegyverbe tár, szellem szolgálat, gyógyszeradag, méreg
  felhasznalasNev?: string;
  felhasznalt?: number;
  felhasznalasMax?: number;
}

export interface TamadasModel {
  nev: string;
  akcio: number;
  ero: number;
  sebzes: number;
  sebKod: string;
}

export interface TavolsagModel {
  nev: string;
  ertek: number;
  modosito: number;
}

export interface nevErtekModel {
  nev: string;
  ertek: number;
}
