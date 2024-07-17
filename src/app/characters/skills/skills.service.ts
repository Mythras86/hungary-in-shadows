import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { SkillInterface, SkillSpecInterface } from './skills.util';
import { SkillSpecFG } from './skills.model';

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
      activeSkills: this.fb.array([]),
      knowledgeSkills: this.fb.array([]),
      languageSkills: this.fb.array([]),
    };
    return this.skillsForm = this.fb.group(skills);
  }

  addSkill(skill: SkillInterface, input: string): void {
    if (skill == null) {
      return;
    }
    let veglegesNev: string = '';
    if (skill.nev == '') {
      veglegesNev = input;
    } else {
      veglegesNev = skill.nev;
    }
    const skills = this.fb.group({
      id: [skill.id, Validators.required],
      nev: [veglegesNev, Validators.required],
      nevKieg: [skill.nevKieg, Validators.required],
      csoport: [skill.csoport, Validators.required],
      szint: [1, Validators.required],
      kapTul: [skill.kapTul, Validators.required],
      specs: this.fb.array([]),
    });
    this.resS.payKarma(skill.karmaKtsg);
    (this.skillsForm.get(skill.csoport) as FormArray).push(skills);
  }

  setSkills(skills: any[], faName: string): void {
    const skillsFA = (this.skillsForm.get(faName) as FormArray);
    skills.forEach(e => {
      skillsFA.push(
        this.fb.group({
          id: e.id,
          nev: e.nev,
          nevKieg: e.nevKieg,
          csoport: e.csoport,
          szint: e.szint,
          kapTul: e.kapTul,
          specs: this.fb.array(e.specs.map((x: SkillSpecFG) =>this.setSpecs(x)))
        }))
      }
    );
  }

  setSpecs(x:any=null)
 {
   x=x || {Z:null}
   return this.fb.group({
      id: x.id,
      nev: x.nev,
      spec: x.spec,
      szint: x.szint,
   })
 }

  updateSkills(activeSkills: any, knowledgeSkills: any, languageSkills: any): void {
    this.createSkills();
    this.setSkills(activeSkills, 'activeSkills');
    this.setSkills(knowledgeSkills, 'knowledgeSkills');
    this.setSkills(languageSkills, 'languageSkills');
  }

  removeSkill(skillCsoport:string, i:number): void {
    (this.skillsForm.get(skillCsoport) as FormArray).removeAt(i);
  }

  getFc(skillCsoport: string, i:number, fcName:string): FormControl {
    const skillPath = ((this.skillsForm.get(skillCsoport) as FormArray).at(i) as FormGroup).get(fcName);
    return skillPath as FormControl;
  }

  getFcLv2(skillCsoport: string, i:number, j: number, fcName:string): FormControl {
    const specPath = (((this.skillsForm.get(skillCsoport) as FormArray).at(i) as FormGroup).get('specs') as FormArray).at(j).get(fcName);
    return specPath as FormControl;
  }

  addFirstLanguage(nev: string): void {
    const beszed = this.fb.group({
      id: ['nyelv', Validators.required],
      nev: [nev, Validators.required],
      nevKieg: ['Nyelv', Validators.required],
      csoport: ['Nyelvi szakértelmek', Validators.required],
      szint: [4, Validators.required],
      kapTul: ['asztUgy'],
      specs: this.fb.array([]),
    });
    (this.skillsForm.get('languageSkills') as FormArray).push(beszed);
    const iras = this.fb.group({
      id: ['iras', Validators.required],
      nev: [nev, Validators.required],
      nevKieg: ['Írás/olvasás', Validators.required],
      csoport: ['Nyelvi szakértelmek', Validators.required],
      szint: [2, Validators.required],
      kapTul: ['asztUgy'],
      specs: this.fb.array([]),
    });
    (this.skillsForm.get('languageSkills') as FormArray).push(iras);
  }

  addSpec(skillCsoport:string, spec: SkillSpecInterface, i: number): void {
    if (spec == null) {
      return;
    }
    const specs = this.fb.group({
      id: [spec.id, Validators.required],
      nev: [spec.nev, Validators.required],
      specOf: [spec.specOf, Validators.required],
      szint: [1, Validators.required],
    }) as SkillSpecFG;
    this.resS.payKarma(spec.karmaKtsg);
    (((this.skillsForm.get(skillCsoport) as FormArray).at(i) as FormGroup).get('specs') as FormArray).push(specs);
  }

  removeSpec(skillCsoport:string, i: number, j: number) {
    (((this.skillsForm.get(skillCsoport) as FormArray).at(i) as FormGroup).get('specs') as FormArray).removeAt(j);
  }

}
