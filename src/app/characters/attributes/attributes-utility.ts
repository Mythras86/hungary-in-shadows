export const attributesUtil: Array<AttrInterface> = [
  //fizikai
  {csoport: 'Fizikum', nev: 'Erő', rovidnev: 'ERO', fcName:'fizEro', max: 6, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Fizikum', nev: 'Gyorsaság', rovidnev: 'GYO', fcName:'fizGyo', max: 6, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Fizikum', nev: 'Ügyesség', rovidnev: 'UGY', fcName:'fizUgy', max: 6, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Fizikum', nev: 'Kitartás', rovidnev: 'KIT', fcName:'fizKit', max: 6, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  //szellemi
  {csoport: 'Asztrál', nev: 'Karizma', rovidnev: 'KAR', fcName:'asztEro', max: 6, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Asztrál', nev: 'Intuíció', rovidnev: 'INT', fcName:'asztGyo', max: 6, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Asztrál', nev: 'Logika', rovidnev: 'LOG', fcName:'asztUgy', max: 6, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Asztrál', nev: 'Akaraterő', rovidnev: 'AKA', fcName:'asztKit', max: 6, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  //speciális
  {csoport: 'Speciális', nev: 'Mágia', rovidnev: 'MAG', fcName:'magia', max: 6, lepes: 6, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Speciális', nev: 'Chi Áramlás', rovidnev: 'CHI', fcName:'chiAramlas', max: 6, lepes: 6, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Speciális', nev: 'Kockatartalék', rovidnev: 'EDGE', fcName:'kockatartalek', max: 6, lepes: 6, egyseg: 'Szint', megjegyzes: 'van'},
  //konstans
  {csoport: 'Konstans', nev: 'Esszencia', rovidnev: 'ESSZ', fcName:'esszencia', max: 0, lepes: 0, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Konstans', nev: 'Reakció', rovidnev: 'REAK', fcName:'reakcio', max: 0, lepes: 0, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Konstans', nev: 'Kezdeményezés', rovidnev: 'KEZD', fcName:'kezdemenyezes', max: 0, lepes: 0, egyseg: 'Szint', megjegyzes: 'van'},
];

export interface AttrInterface {
  csoport: string,
  nev: string,
  rovidnev: string,
  fcName: string,
  max: number,
  lepes: number,
  egyseg: string,
  megjegyzes: string,
}
