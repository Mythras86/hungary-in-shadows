import { Component } from '@angular/core';
import { SkillsService } from './skills.service';
import { LevelcontrolService } from 'src/app/elements/modals/levelcontrol/levelcontrol.service';
import { skillsUtil } from './skills.util';
import { FormArray} from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { SelectSkillsService } from 'src/app/elements/modals/select-skills/select-skills.service';
import { InputModalService } from 'src/app/elements/modals/input-modal/input-modal.service';
import { DetailsService } from '../details/details.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  constructor(
    public skillsServ: SkillsService,
    public detailssServ: DetailsService,
    public inputModServ: InputModalService,
    public lvlContServ: LevelcontrolService,
    public resServ: ResourcesService,
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

  getMegjFromUtil(skillnev: string): Array<any> {
    const megjegyzes = skillsUtil.filter(x => x.nev == skillnev).map(x => x.megjegyzes);
    return megjegyzes;
  }

  anyanyelvChangeDetector() {
    const anyanyelv = this.detailssServ.detailsForm.get('anyanyelv');
    anyanyelv?.valueChanges.subscribe(w =>{
      this.skillsServ.addFirstLanguage('Anyanyelvi beszéd', w, 4);
      this.skillsServ.addFirstLanguage('Anyanyelvi Í/O', w, 2);
    })
  }

  ngOnInit(): void {
    this.skillsServ.createSkills();
    this.anyanyelvChangeDetector();
  }

}