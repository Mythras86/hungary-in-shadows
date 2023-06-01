import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { skillsUtil } from './skills.util';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(
    private fb: FormBuilder
  ) { }

  skillsForm!: FormGroup;

  createSkills(): FormGroup {
    const skills = {
      skills: this.fb.array([]),
    };
    return this.skillsForm = this.fb.group(skills);
  }

  addSkill(nev: string, megjegyzes: string): void {
    const tipus = skillsUtil.filter(x => x.nev == nev).map(x => x.csoport)[0];
    const skills = this.fb.group({
      szakertNev: [nev, {value: nev, disabled: false}],
      szakertTipus: [tipus, {value: tipus, disabled: false}],
      szakertMegjegyzes: [megjegyzes, {value: megjegyzes, disabled: false}],
      szakertSzint: [1, {value: 1, disabled: false}],
    });
    (this.skillsForm.get('skills') as FormArray).push(skills);
  }

  removeSkill(i:number): void {
    (this.skillsForm.get('skills') as FormArray).removeAt(i);
  }

  addFirstLanguage(langName:string, langDesc:string, baseLvl: number): void {
    const skillsForm = this.fb.group({
      szakertNev: [langName, {value: langName, disabled: false}],
      szakertTipus: ['', {value: '', disabled: false}],
      szakertMegjegyzes: [langDesc, {value: langDesc, disabled: false}],
      szakertSzint: [baseLvl, {value: baseLvl, disabled: false}],
    });
    (this.skillsForm.get('languageSkills') as FormArray).push(skillsForm);
  }

}
