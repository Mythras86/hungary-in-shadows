import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { SkillInterface, skillsSpecUtil, skillsUtil } from './skills.util';
import { SkillSpecFG, SkillsFG, SkillsModel } from './skills.model';

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

  addSkill(nev: string, nevKieg: string): void {
    if (nev == null) {
      return;
    }
    let skill: SkillInterface;
    if (nevKieg == '') {
      skill = skillsUtil.filter(x => x.nev == nev).map(x => x)[0];
    } else {
      skill = skillsUtil.filter(x => x.nevKieg == nevKieg).map(x => x)[0];
    }
    const skills = this.fb.group({
      nev: [nev, Validators.required],
      nevKieg: [nevKieg, Validators.required],
      csoport: [skill.csoport, Validators.required],
      szint: [1, Validators.required],
      kapTul: [skill.kapTul],
      specs: this.fb.array([]),
    }) as SkillsFG;
    this.resS.payKarma(skill.karmaKtsg);
    (this.skillsForm.get('skills') as FormArray).push(skills);
  }

  setSkills(dataset: any[]): FormArray<SkillsFG> {
    const skills = (this.skillsForm.get('skills') as FormArray);
    dataset.forEach(e => {
      skills.push(
        this.fb.group({
          nev: e.nev,
          csoport: e.csoport,
          multi: e.multi,
          szint: e.szint,
          kapTul: e.kapTul,
          specs: this.setSpecs(e.specs)
        }))
      });
      return skills;
  }

  setSpecs(specs: any[]) {

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

  getFc(i:number, fcName:string): FormControl {
    const skillPath = ((this.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get(fcName);
    return skillPath as FormControl;
  }

  addFirstLanguage(): void {
    const beszed = this.fb.group({
      nev: ['Anyanyelv', Validators.required],
      nevKieg: ['', Validators.required],
      csoport: ['Nyelvi szakértelmek', Validators.required],
      multi: false,
      szint: [4, Validators.required],
      kapTul: ['asztUgy'],
      specs: this.fb.array([]),
    });
    (this.skillsForm.get('skills') as FormArray).push(beszed);
    const iras = this.fb.group({
      nev: ['Írás/olvasás', Validators.required],
      nevKieg: ['', Validators.required],
      csoport: ['Nyelvi szakértelmek', Validators.required],
      multi: false,
      szint: [2, Validators.required],
      kapTul: ['asztUgy'],
      specs: this.fb.array([]),
    });
    (this.skillsForm.get('skills') as FormArray).push(iras);
  }

  addSpec(nev: string, i: number): void {
    const spec = skillsSpecUtil.filter(x => x.nev == nev).map(x => x)[0];
    if (nev == null) {
      return;
    }
    const specs = this.fb.group({
      nev: [nev, Validators.required],
      spec: [spec.spec, Validators.required],
      szint: [1, Validators.required],
    }) as SkillSpecFG;
    this.resS.payKarma(spec.karmaKtsg);
    (((this.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get('specs') as FormArray).push(specs);
  }

}
