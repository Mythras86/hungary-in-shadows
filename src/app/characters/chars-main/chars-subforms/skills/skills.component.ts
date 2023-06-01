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

  get skills() : FormArray {
    return this.skillsServ.skillsForm.get("skills") as FormArray;
  }

  getTipus():Array<any> {
    const tipus = [...new Set(skillsUtil.map(x=> x.tipus))];
    return tipus;
  }

  getControls(tipus:string):Array<any> | null {
    const filtered = skillsUtil.filter(x => x.tipus == tipus).map(x => x);
    if (!this.skillsServ.skillsForm) {
      return null;
    }
    return filtered;
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
