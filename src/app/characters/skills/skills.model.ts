import { AbstractControl, FormGroup } from "@angular/forms";

export interface SkillsModel {
  nev: string;
  csoport: string;
  szint: number;
  kapTul: string;
  specs?: Array<SkillSpecModel>
}

export interface SkillsFG extends FormGroup {
  value: SkillsModel;
  controls: {
    nev: AbstractControl;
    csoport: AbstractControl;
    szint: AbstractControl;
    kapTul: AbstractControl;
    specs?: AbstractControl<SkillSpecFG>
    }
}

export interface SkillSpecModel {
  nev: string,
  spec: string,
  szint: number,
}

export interface SkillSpecFG {
  value: SkillSpecModel;
  controls: {
    nev: AbstractControl,
    spec: AbstractControl,
    szint: AbstractControl,
  }
}
