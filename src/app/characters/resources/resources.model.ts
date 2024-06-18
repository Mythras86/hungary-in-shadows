import { AbstractControl, FormGroup } from "@angular/forms";

export interface ResourcesModel {
  alapKarma: number;
  szerzettKarma: number;
  elkoltottKarma: number;

  alapToke: number;
  szerzettToke: number;
  elkoltottToke: number;
}

export interface ResourcesFG extends FormGroup {
  value: ResourcesModel;
  controls: {
    alapKarma: AbstractControl;
    szerzettKarma: AbstractControl;
    elkoltottKarma: AbstractControl;

    alapToke: AbstractControl;
    szerzettToke: AbstractControl;
    elkoltottToke: AbstractControl;
  }
}
