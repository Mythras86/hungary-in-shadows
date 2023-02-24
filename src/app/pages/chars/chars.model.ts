export interface CharModel {
  _id: string;
  creatorName: string;
  creatorID: string;
  nev: string;
  kaszt: string;
}

export interface CharsDataInterface {
  chars: CharModel[];
}
