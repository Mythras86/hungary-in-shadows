export interface CharModel {
  _id: string;
  creatorName: string;
  creatorId: string;
  nev: string;
  kaszt: string;
}

export interface CharsDataInterface {
  chars: CharModel[];
}
