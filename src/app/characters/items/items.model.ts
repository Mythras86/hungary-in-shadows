export interface ItemsModel {

  //alap adatok
  _id: string;
  csoport: string;
  tipus: string;
  nev: string;
  leiras?: string;

  //súly
  suly?: number;
  sulySzorzo?: number;

  //költségek kumulatív
  tokeKtsg?: number;
  karmaKtsg?: number;
  esszenciaKtsg?: number;

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

  tavolsag?: Array<Tavolsag>;

  tamadas?: Array<Tamadas>;

  tulajdonsagModosito?: Array<TulajdonsagModosito>;

  //felhasználás pl.?: fegyverbe tár, szellem szolgálat, gyógyszeradag, méreg
  felhasznalasNev?: string;
  felhasznalt?: number;
  felhasznalasMax?: number;
}

export interface Tamadas {
  nev: string;
  akcio: number;
  ero: number;
  sebzes: number;
  sebKod: string;
}

export interface Tavolsag {
  nev: string;
  ertek: number;
  modosito: number;
}

export interface TulajdonsagModosito {
  nev: string;
  ertek: number;
}
