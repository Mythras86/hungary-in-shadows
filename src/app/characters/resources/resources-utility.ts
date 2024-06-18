export const karmaUtil: Array<resInterface> = [
  {nev: 'Alap Karma', fcName: 'alapKarma'},
  {nev: 'Szerzett Karma', fcName: 'szerzettKarma'},
  {nev: 'Elköltött Karma', fcName: 'elkoltottKarma'},
];

export const tokeUtil: Array<resInterface> = [
  {nev: 'Alap Tőke', fcName: 'alapToke'},
  {nev: 'Szerzett Tőke', fcName: 'szerzettToke'},
  {nev: 'Elköltött Tőke', fcName: 'elkoltottToke'},
];

export interface resInterface {
  nev: string,
  fcName: string,
}
