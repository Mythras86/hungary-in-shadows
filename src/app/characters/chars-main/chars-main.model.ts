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
  elkolthetoKarma: number,
  elkolthetoToke: number,
  karmabolToke: number
  //fizikai
  fizEro: number,
  fizEroMod: number,
  fizGyo: number,
  fizGyoMod: number,
  fizUgy: number,
  fizUgyMod: number,
  fizAll: number,
  fizAllMod: number,
  //asztrál
  asztEro: number,
  asztEroMod: number,
  asztGyo: number,
  asztGyoMod: number,
  asztUgy: number,
  asztUgyMod: number,
  asztAll: number,
  asztAllMod: number,
  //speciális
  magia: number,
  magiaMod: number,
  esszencia: number,
  esszenciaMod: number,
  kockatartalek: number,
  kockatartalekMod: number,
  kezdemenyezes: number,
  kezdemenyezesMod: number,
  // szakértelmek
  skills: Array<any>,
  // állapot
  astral: number,
  body: number,

}
