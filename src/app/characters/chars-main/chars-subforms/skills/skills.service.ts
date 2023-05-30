import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(
    private fb: FormBuilder
  ) { }

  skillsForm!: FormGroup;

  createSkills(): FormGroup {
    const skillsForm = {
      skills: this.fb.array([]),
    };
    return this.fb.group(skillsForm);
  }

  addSkill(faName: string): void {
    const skillsForm = this.fb.group({
      szakertNev: ['', {value: '', disabled: false}],
      szakertTipus: ['', {value: '', disabled: false}],
      szakertMegjegyzes: ['', {value: '', disabled: false}],
      szakertSzint: [1, {value: 1, disabled: false}],
    });
    (this.skillsForm.get(faName) as FormArray).push(skillsForm);
  }

  removeSkill(i:number, faName:string): void {
    (this.skillsForm.get(faName) as FormArray).removeAt(i);
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
