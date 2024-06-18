import { AbstractControl, FormGroup } from "@angular/forms";

export interface StatusModel {
  //állapot
  asztralisAllapot: number,
  fizikaiAllapot: number,
  pinhentsegAllapot: number,
  taplaltsagAllapot: number,
};

export interface StatisFG extends FormGroup{
  value: StatusModel;
  controls: {
    asztralisAllapot: AbstractControl,
    fizikaiAllapot: AbstractControl,
    pinhentsegAllapot: AbstractControl,
    taplaltsagAllapot: AbstractControl,
  }
};
