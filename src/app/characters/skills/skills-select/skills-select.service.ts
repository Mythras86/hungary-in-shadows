import { Injectable } from '@angular/core';
import { SkillsModel } from '../skills.model';
import { skillsUtil } from '../skills.util';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { SkillsSelectComponent } from './skills-select.component';
import { SkillsService } from '../skills.service';

@Injectable({
  providedIn: 'root'
})
export class SkillsSelectService {

  constructor(
    private skillsS: SkillsService,
    private modalServ: ModalService,
  ) { }

  getSkills(): Array<SkillsModel> {
    return skillsUtil;
  }

  getCsoportok(): Array<any> {
    const csoport = skillsUtil.map(x => x.csoport);
    const csopUniq = [...new Set(csoport.map(x=> x))];
    csopUniq.sort();
    return csopUniq;
  }

  buttonAction(
    ) {
    this.modalServ.openModal(SkillsSelectComponent, '').subscribe(
      w => this.updateData(w)
      );
  }

  updateData(skill: string) {
    return this.skillsS.addSkill(skill);
  }

}
