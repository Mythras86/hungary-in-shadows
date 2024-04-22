export interface ArmorsModel{
  _id: string,
  nev: string,
  csoport: string,
  szint: number,
  suly: number,
  // kiegekSulya: number,
  ar: number,
  // kiegekAra: number,
  // elhelyezes: string,
  megjegyzes: string
  // felszerelt: Array<string>,
  // addons: Array<AAddonsModel>
}
export interface AAddonsModel{
  _id: string,
  nev: string,
  csoport: string,
  suly: number,
  sulySzorzo: number,
  ar: number,
  arSzorzo: number,
  megjegyzes: string
  }
