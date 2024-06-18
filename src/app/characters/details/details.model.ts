import { AbstractControl, FormGroup } from "@angular/forms";

export interface DetailsModel {
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
  // hosszú szöveg
  felelem:string,
  osztonzo:string,
  gyulolet:string,
  kedvenc:string,
  irtozat:string,
  vonzalom:string,
  megjelenes:string,
};

export interface DetailsFG extends FormGroup {
  value: DetailsModel;
  controls: {
    teljesnev: AbstractControl,
    becenev:AbstractControl,
    alnev:AbstractControl,
    testalkat:AbstractControl,
    hajstilus:AbstractControl,
    //értékválasztó
    nem: AbstractControl,
    dns:AbstractControl,
    anyanyelv: AbstractControl,
    eletkor:AbstractControl,
    magassag:AbstractControl,
    testsuly:AbstractControl,
    //szín
    szemszin:AbstractControl,
    hajszin:AbstractControl,
    szorszin:AbstractControl,
    borszin:AbstractControl,
    kedvencszin:AbstractControl,
    // hosszú szöveg
    felelem:AbstractControl,
    osztonzo:AbstractControl,
    gyulolet:AbstractControl,
    kedvenc:AbstractControl,
    irtozat:AbstractControl,
    vonzalom:AbstractControl,
    megjelenes:AbstractControl,
  }
}
