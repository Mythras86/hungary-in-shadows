export interface WeaponsModel{
  _id: string,
  nev: string,
  csoport: string,
  tipus: string,
  tar: string,
  tamadasiModok: string,
  tav: string,
  ero: number,
  sebzes: number,
  sebzesTipus: string,
  suly: number,
  kiegekSulya: number,
  ar: number,
  kiegekAra: number,
  elhelyezes: string,
  megjegyzes: string
  felszerelt: Array<string>,
  addons: Array<WAddonsModel>
}

export interface WAddonsModel{
  _id: string,
  nev: string,
  csoport: string,
  elhelyezes: string,
  suly: number,
  sulySzorzo: number,
  ar: number,
  arSzorzo: number,
  megjegyzes: string
}
