import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { skillsUtil } from './skills.util';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(
    private fb: FormBuilder,
    private resS: ResourcesService,
  ) { }

  skillsForm!: FormGroup;

  createSkills(): FormGroup {
    const skills = {
      skills: this.fb.array([]),
    };
    return this.skillsForm = this.fb.group(skills);
  }

  addSkill(nev: string): void {
    if (nev == null) {
      return;
    }

    const skill = skillsUtil.filter(x => x.nev == nev).map(x => x)[0];
    const skills = this.fb.group({
      nev: [skill.nev, Validators.required],
      csoport: [skill.csoport, Validators.required],
      megjegyzes: [''],
      szint: [1, Validators.required],
      kapTul: [skill.kapTul],
    });
    this.resS.payKarma(2);
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
          szint: e.szint,
          kapTul: e.kapTul
      }))
    });
    return skills;
  }

  updateSkills(w: any): void {
    this.createSkills();
    this.skillsForm.addControl('skillsForm', new FormGroup({}));
    (this.skillsForm as FormGroup).addControl('skills', this.setSkills(w.skills));
  }

  removeSkill(i:number): void {
    this.resS.payKarma(-2);
    (this.skillsForm.get('skills') as FormArray).removeAt(i);
  }

  getFc(i:number, fcName:string): any {
    const skillPath = ((this.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get(fcName);
    return skillPath;
  }

  addFirstLanguage(): void {
    const beszed = this.fb.group({
      nev: ['Anyanyelvi beszéd', Validators.required],
      csoport: ['Nyelvi', Validators.required],
      megjegyzes: [''],
      szint: [4, Validators.required],
      kapTul: ['Log'],
    });
    (this.skillsForm.get('skills') as FormArray).push(beszed);
    const iras = this.fb.group({
      nev: ['Anyanyelvi Í/O', Validators.required],
      csoport: ['Nyelvi', Validators.required],
      megjegyzes: [''],
      szint: [2, Validators.required],
      kapTul: ['Log'],
    });
    (this.skillsForm.get('skills') as FormArray).push(iras);
  }

}
