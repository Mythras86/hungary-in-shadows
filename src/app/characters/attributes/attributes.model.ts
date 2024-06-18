import { AbstractControl, FormGroup } from "@angular/forms";

export interface AttributesModel {
  //fizikai
  fizEro: number,
  fizGyo: number,
  fizUgy: number,
  fizKit: number,
  //asztrál
  asztEro: number,
  asztGyo: number,
  asztUgy: number,
  asztKit: number,
  //speciális
  magia: number,
  chiAramlas: number,
  kiberKapacitas: number,
  kockatartalek: number,
  //konstans
  esszencia: number,
};

export interface AttributesFG extends FormGroup {
  value: AttributesModel;
  controls: {
    //fizikai
    fizEro: AbstractControl,
    fizGyo: AbstractControl,
    fizUgy: AbstractControl,
    fizKit: AbstractControl,
    //asztrál
    asztEro: AbstractControl,
    asztGyo: AbstractControl,
    asztUgy: AbstractControl,
    asztKit: AbstractControl,
    //speciális
    magia: AbstractControl,
    chiAramlas: AbstractControl,
    kiberKapacitas: AbstractControl,
    kockatartalek: AbstractControl,
    //konstans
    esszencia: AbstractControl,
  }
};
