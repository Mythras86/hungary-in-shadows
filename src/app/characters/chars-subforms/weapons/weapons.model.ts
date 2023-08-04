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
  ar: number,
  elhelyezes: string,
  megjegyzes: string
}

export interface WAddonsModel{
  _id: string,
  nev: string,
  csoport: string,
  suly: number,
  ar: number,
  elhelyezes: string,
  megjegyzes: string
}
