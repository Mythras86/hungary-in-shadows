import { AbstractControl, FormGroup } from "@angular/forms";

export interface SkillsModel {
  id: string;
  nev: string;
  nevKieg: string;
  csoport: string;
  faName: string;
  szint: number;
  kapTul: string;
  specs?: SkillSpecModel[]
}

export interface SkillsFG extends FormGroup {
  value: SkillsModel;
  controls: {
    id: AbstractControl<string>;
    nev: AbstractControl;
    nevKieg: AbstractControl;
    csoport: AbstractControl;
    faName: AbstractControl;
    szint: AbstractControl;
    kapTul: AbstractControl;
    specs?: AbstractControl<SkillSpecFG[]>
    }
}

export interface SkillSpecModel {
  id: string;
  nev: string;
  specOf: string;
  szint: number;
}

export interface SkillSpecFG extends FormGroup {
  value: SkillSpecModel;
  controls: {
    id: AbstractControl;
    nev: AbstractControl;
    specOf: AbstractControl;
    szint: AbstractControl;
  }
}
