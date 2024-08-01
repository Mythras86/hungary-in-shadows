import { AbstractControl, FormGroup } from "@angular/forms";

export interface AttributesModel {
  //fizikai
  fizEro: number;
  fizGyo: number;
  fizUgy: number;
  fizKit: number;
  fizEroMod: number;
  fizGyoMod: number;
  fizUgyMod: number;
  fizKitMod: number;
  //asztrál
  asztEro: number;
  asztGyo: number;
  asztUgy: number;
  asztKit: number;
  asztEroMod: number;
  asztGyoMod: number;
  asztUgyMod: number;
  asztKitMod: number;
  //speciális
  magia: number;
  chiAramlas: number;
  kockatartalek: number;
  magiaMod: number;
  chiAramlasMod: number;
  kockatartalekMod: number;
  //konstans
  esszencia: number;
  reakcio: number;
  kezdemenyezes: number
  esszenciaMod: number;
  reakcioMod: number;
  kezdemenyezesMod: number;
};

export interface AttributesFG extends FormGroup {
  value: AttributesModel;
  controls: {
    //fizikai
    fizEro: AbstractControl;
    fizGyo: AbstractControl;
    fizUgy: AbstractControl;
    fizKit: AbstractControl;
    fizEroMod: AbstractControl;
    fizGyoMod: AbstractControl;
    fizUgyMod: AbstractControl;
    fizKitMod: AbstractControl;
    //asztrál
    asztEro: AbstractControl;
    asztGyo: AbstractControl;
    asztUgy: AbstractControl;
    asztKit: AbstractControl;
    asztEroMod: AbstractControl;
    asztGyoMod: AbstractControl;
    asztUgyMod: AbstractControl;
    asztKitMod: AbstractControl;
    //speciális
    magia: AbstractControl;
    chiAramlas: AbstractControl;
    kockatartalek: AbstractControl;
    magiaMod: AbstractControl;
    chiAramlasMod: AbstractControl;
    kockatartalekMod: AbstractControl;
    //konstans
    esszencia: AbstractControl;
    reakcio: AbstractControl;
    kezdemenyezes: AbstractControl;
    esszenciaMod: AbstractControl;
    reakcioMod: AbstractControl;
    kezdemenyezesMod: AbstractControl;
  }
};
