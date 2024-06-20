import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { skillsUtil } from './skills.util';
import { SkillsFG } from './skills.model';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { SkillsComponent } from './skills.component';
import { InpDetailsComponent } from 'src/app/elements/Inputs/inp-details/inp-details.component';

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

  addSkill(nev: string, nevKieg:string): void {
    if (nev == null) {
      return;
    }
    const skill = skillsUtil.filter(x => x.nev == nev).map(x => x)[0];
    const skills = this.fb.group({
      nev: [skill.nev, Validators.required],
      nevKieg: [nevKieg],
      csoport: [skill.csoport, Validators.required],
      szint: [1, Validators.required],
      kapTul: [skill.kapTul],
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
      nev: ['Anyanyelvi beszéd', Validators.required],
      nevKieg: [''],
      csoport: ['Nyelvi', Validators.required],
      szint: [4, Validators.required],
      kapTul: ['Log'],
    });
    (this.skillsForm.get('skills') as FormArray).push(beszed);
    const iras = this.fb.group({
      nev: ['Anyanyelvi Í/O', Validators.required],
      nevKieg: [''],
      csoport: ['Nyelvi', Validators.required],
      szint: [2, Validators.required],
      kapTul: ['Log'],
    });
    (this.skillsForm.get('skills') as FormArray).push(iras);
  }

  selectSkill(): void {
    this.selectMode = true;
    this.modalS.openModal(SkillsComponent, '').subscribe(
      w => this.updateData(w[0], w[1])
    );
  }

  updateData(nev: string, nevKieg: string): void {
    return this.addSkill(nev, nevKieg);
  }
}
