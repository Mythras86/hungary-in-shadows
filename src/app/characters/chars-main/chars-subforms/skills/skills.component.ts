import { Component } from '@angular/core';
import { SkillsService } from './skills.service';
import { LevelcontrolService } from 'src/app/elements/modals/levelcontrol/levelcontrol.service';
import { skillsUtil } from './skills.util';
import { FormArray, FormArrayName, FormGroup } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { SelectSkillsService } from 'src/app/elements/modals/select-skills/select-skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  constructor(
    public skillsServ: SkillsService,
    public lvlContServ: LevelcontrolService,
    private resServ: ResourcesService,
    public selSkillsModalServ: SelectSkillsService
  ) { }

  public get skills(): FormArray | null {
    if(!this.skillsServ.skillsForm) {
      return null;
    }
    return this.skillsServ.skillsForm.controls['skills'] as FormArray;
  }

  getCsoportok():Array<any> {
    const csoport = [...new Set(skillsUtil.map(x=> x.csoport))];
    return csoport;
  }

  checkCsoport(csoport: string):boolean {
    const form = (this.skillsServ.skillsForm.get('skills') as FormArray);
    const csoportArr = Object.values(form.controls).map(x => x.value).map(x => x.szakertCsoport);
    const csopArrUniq = [...new Set(csoportArr.map(x=> x))];
    const check = csopArrUniq.includes(csoport);
    return check;
  }

  getControls():Array<any> {
    const controls = (this.skillsServ.skillsForm.get('skills') as FormArray).controls;
    return controls;
  }

  getSkillData(i:number, dataname:string) {
    const data = ((this.skillsServ.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get(dataname)?.value;
    return data;
  }


  getSkillsUtil(): Array<any> {
    return skillsUtil;
  }

  getFcPath(i:number) {
    const skillpath = ((this.skillsServ.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get('szakertSzint');
    return skillpath;
  }

  getFcValue(i:number) {
    const skillvalue = ((this.skillsServ.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get('szakertSzint')?.value;
    return skillvalue;
  }

  getSkillPointsPath() {
    return this.resServ.resourcesForm.get('elkolthetoSzakPont');
  }

  ngOnInit(): void {
    this.skillsServ.createSkills();
    // this.skillsServ.addFirstLanguage('Anyanyelvi beszéd', '', 0);
    // this.skillsServ.addFirstLanguage('Anyanyelvi Í/O', '', 0);

  }

}
