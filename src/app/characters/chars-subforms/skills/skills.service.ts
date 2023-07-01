import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    if (nev == '') {
      return;
    }
    const karma = this.resServ.getFc('elkolthetoKarma');
    const csoport = skillsUtil.filter(x => x.nev == nev).map(x => x.csoport)[0];
    const skills = this.fb.group({
      nev: [nev, Validators.required],
      csoport: [csoport, Validators.required],
      megjegyzes: [''],
      szint: [1, Validators.required],
    });
    karma.patchValue(karma.value-2);
    (this.skillsForm.get('skills') as FormArray).push(skills);
  }

  setSkills(dataset: any[]): FormArray<any> {
    const skills = (this.skillsForm.get('skills') as FormArray);
    dataset.forEach(e => {
      skills.push(
        this.fb.group({
          nev: e.nev,
          csoport: e.csoport,
          megjegyzes: e.megjegyzes,
          szint: e.szint
        }))
    });
    console.log(dataset)
    return skills;
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
      nev: [langName, Validators.required],
      csoport: ['Nyelvi', Validators.required],
      megjegyzes: [langDesc],
      szint: [baseLvl, Validators.required],
    });
    (this.skillsForm.get('skills') as FormArray).push(skillsForm);
  }

}
