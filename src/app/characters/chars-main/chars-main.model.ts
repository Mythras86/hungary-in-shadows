export interface CharModel {

  _id: string;
  creatorName: string;
  creatorId: string;
  //szöveges
  teljesnev: string,
  becenev:string,
  alnev:string,
  testalkat:string,
  hajstilus:string,
  //értékválasztó
  nem: string,
  dns:string,
  anyanyelv: string,
  eletkor:number,
  magassag:number,
  testsuly:number,
  //szín
  szemszin:string,
  hajszin:string,
  szorszin:string,
  borszin:string,
  kedvencszin:string,
  //hosszú szöveg
  felelem:string,
  osztonzo:string,
  gyulolet:string,
  kedvenc:string,
  irtozat:string,
  vonzalom:string,
  megjelenes:string,
  //erőforrások
  szabadKarma: number,
  szabadToke: number,
  karmabolToke: number
  //fizikai
  fizEro: number,
  fizEroMod: number,
  fizGyo: number,
  fizGyoMod: number,
  fizUgy: number,
  fizUgyMod: number,
  fizKit: number,
  fizKitMod: number,
  //asztrál
  asztEro: number,
  asztEroMod: number,
  asztGyo: number,
  asztGyoMod: number,
  asztUgy: number,
  asztUgyMod: number,
  asztKit: number,
  asztKitMod: number,
  //speciális
  magia: number,
  esszencia: number,
  kockatartalek: number,
  kezdemenyezes: number,
  // szakértelmek
  skills: Array<any>,
  // állapot
  asztralisAllapot: number,
  fizikaiAllapot: number,
  pinhentsegAllapot: number,
  taplaltsagAllapot: number,
  armorLevel: number,

}
