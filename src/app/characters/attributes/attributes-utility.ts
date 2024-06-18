export const attributesUtil: Array<AttrInterface> = [
  //fizikai
  {csoport: 'Fizikum', nev: 'Erő', rovidnev: 'ERO', fcName:'fizEro', max: 5, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Fizikum', nev: 'Gyorsaság', rovidnev: 'GYO', fcName:'fizGyo', max: 5, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Fizikum', nev: 'Ügyesség', rovidnev: 'UGY', fcName:'fizUgy', max: 5, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Fizikum', nev: 'Kitartás', rovidnev: 'KIT', fcName:'fizKit', max: 5, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  //szellemi
  {csoport: 'Asztrál', nev: 'Karizma', rovidnev: 'KAR', fcName:'asztEro', max: 5, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Asztrál', nev: 'Intuíció', rovidnev: 'INT', fcName:'asztGyo', max: 5, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Asztrál', nev: 'Logika', rovidnev: 'LOG', fcName:'asztUgy', max: 5, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Asztrál', nev: 'Akaraterő', rovidnev: 'AKA', fcName:'asztKit', max: 5, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  //speciális
  {csoport: 'Speciális', nev: 'Mágia', rovidnev: 'MAG', fcName:'magia', max: 5, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Speciális', nev: 'Chi Áramlás', rovidnev: 'CHI', fcName:'chiAramlas', max: 5, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Speciális', nev: 'Kiber Kapacitás', rovidnev: 'CYB', fcName:'kiberKapacitas', max: 5, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
  {csoport: 'Speciális', nev: 'Kockatartalék', rovidnev: 'EDGE', fcName:'kockatartalek', max: 5, lepes: 5, egyseg: 'Szint', megjegyzes: 'van'},
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
