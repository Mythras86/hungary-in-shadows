import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { skillsUtil } from './skills.util';
import { ResourcesService } from '../resources/resources.service';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(
    private fb: FormBuilder,
    private resServ: ResourcesService,
  ) { }

  skillsForm!: FormGroup;

  createSkills(): FormGroup {
    const skills = {
      skills: this.fb.array([]),
    };
    return this.skillsForm = this.fb.group(skills);
  }

  addSkill(nev: string): void {
    const karma = this.resServ.getFc('elkolthetoKarma');
    const csoport = skillsUtil.filter(x => x.nev == nev).map(x => x.csoport)[0];
    const skills = this.fb.group({
      szakertNev: [nev, {value: nev, disabled: false}],
      szakertCsoport: [csoport, {value: csoport, disabled: false}],
      szakertMegjegyzes: ['', {value: '', disabled: false}],
      szakertSzint: [1, {value: 1, disabled: false}],
    });
    karma.patchValue(karma.value-2);
    (this.skillsForm.get('skills') as FormArray).push(skills);
  }

  removeSkill(i:number): void {
    (this.skillsForm.get('skills') as FormArray).removeAt(i);
  }

  getFc(i:number, fcName:string) {
    const skillpath = ((this.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get(fcName);
    return skillpath;
  }

  addFirstLanguage(langName:string, langDesc:string, baseLvl: number): void {
    const skillsForm = this.fb.group({
      szakertNev: [langName, {value: langName, disabled: false}],
      szakertCsoport: ['', {value: '', disabled: false}],
      szakertMegjegyzes: [langDesc, {value: langDesc, disabled: false}],
      szakertSzint: [baseLvl, {value: baseLvl, disabled: false}],
    });
    (this.skillsForm.get('languageSkills') as FormArray).push(skillsForm);
  }

}
