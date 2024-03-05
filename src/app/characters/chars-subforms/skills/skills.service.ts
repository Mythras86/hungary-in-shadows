import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  addSkill(nev: string, csoport: string, kapTul: string): void {
    if (nev == null) {
      return;
    }
    const skills = this.fb.group({
      nev: [nev, Validators.required],
      csoport: [csoport, Validators.required],
      megjegyzes: [''],
      szint: [1, Validators.required],
      kapTul: [kapTul],
    });
    this.resServ.payKarma(2);
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

  removeSkill(i:number): void {
    this.resServ.payKarma(-2);
    (this.skillsForm.get('skills') as FormArray).removeAt(i);
  }

  getFc(i:number, fcName:string) {
    const skillpath = ((this.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get(fcName);
    return skillpath;
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
