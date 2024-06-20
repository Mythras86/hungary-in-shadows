import { AbstractControl, FormGroup } from "@angular/forms";

export interface SkillsModel{
  nev: string;
  nevKieg: string;
  csoport: string;
  szint: number;
  kapTul: string;
}

export interface SkillsFG extends FormGroup {
  value: SkillsModel;
  controls: {
    nev: AbstractControl;
    nevKieg: AbstractControl;
    csoport: AbstractControl;
    szint: AbstractControl;
    kapTul: AbstractControl;
    }
}
