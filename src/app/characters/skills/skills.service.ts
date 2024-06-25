import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { skillsSpecUtil, skillsUtil } from './skills.util';
import { SkillSpecFG, SkillsFG } from './skills.model';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { SkillsComponent } from './skills.component';
import { SelectSkillComponent } from './select-skill/select-skill.component';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(
    private fb: FormBuilder,
    private resS: ResourcesService,
    private modalS: ModalService,
  ) { }

  skillsForm!: FormGroup;

  selectMode: boolean = false;

  createSkills(): FormGroup {
    const skills = {
      skills: this.fb.array([]),
    };
    return this.skillsForm = this.fb.group(skills);
  }

  createSpecs(): FormGroup {
    const specs = {
      specs: this.fb.array([]),
    };
    return this.skillsForm = this.fb.group(specs);
  }

  addSkill(nev: string, nevKieg: string): void {
    const skill = skillsUtil.filter(x => x.nev == nev).map(x => x)[0];
    let veglegesNev: string = '';

    if (nev == null) {
      return;
    }
    if (nevKieg == '') {
      veglegesNev = nev;
    } else {
      veglegesNev = nev + ': ' + nevKieg;
    }
    const skills = this.fb.group({
      nev: [veglegesNev, Validators.required],
      csoport: [skill.csoport, Validators.required],
      szint: [1, Validators.required],
      kapTul: [skill.kapTul],
    }) as SkillsFG;
    this.resS.payKarma(skill.karmaKtsg);
    (this.skillsForm.get('skills') as FormArray).push(skills);
  }

  addSpec(nev: string, i: number): void {
    if (nev == null) {
      return;
    }
    const spec = skillsSpecUtil.filter(x => x.nev == nev).map(x => x)[0];
    const specs = this.fb.group({
      nev: [spec.nev, Validators.required],
      spec: [spec.spec, Validators.required],
      szint: [1, Validators.required],
    }) as SkillSpecFG;
    this.resS.payKarma(spec.karmaKtsg);
    (((this.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get('specs') as FormArray).push(specs);
  }

  setSkills(dataset: any[]): FormArray<SkillsFG> {
    const skills = (this.skillsForm.get('skills') as FormArray);
    dataset.forEach(e => {
      skills.push(
        this.fb.group({
          nev: e.nev,
          nevKieg: e.nevKieg,
          csoport: e.csoport,
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

  getFc(i:number, fcName:string): FormControl {
    const skillPath = ((this.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get(fcName);
    return skillPath as FormControl;
  }

  addFirstLanguage(): void {
    const beszed = this.fb.group({
      nev: ['Anyanyelv', Validators.required],
      csoport: ['Nyelvi szakértelmek', Validators.required],
      szint: [4, Validators.required],
      kapTul: ['asztUgy'],
    });
    (this.skillsForm.get('skills') as FormArray).push(beszed);
    const iras = this.fb.group({
      nev: ['Írás / olvasás', Validators.required],
      csoport: ['Nyelvi szakértelmek', Validators.required],
      szint: [2, Validators.required],
      kapTul: ['asztUgy'],
    });
    (this.skillsForm.get('skills') as FormArray).push(iras);
  }

  newSkill(): void {
    this.modalS.openModal(SelectSkillComponent, '').subscribe(
      w => this.addSkill(w[0], w[1])
    );
  }
  newSpec(i: number): void {
    this.modalS.openModal(SelectSkillComponent, '').subscribe(
      w => this.addSkill(w[0], w[1])
    );
  }
}
