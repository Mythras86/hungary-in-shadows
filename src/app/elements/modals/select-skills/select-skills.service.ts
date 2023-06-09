import { Injectable } from '@angular/core';
import { ModalService } from '../modal.service';
import { SelectSkillsComponent } from './select-skills.component';
import { SkillsService } from 'src/app/characters/chars-main/chars-subforms/skills/skills.service';

@Injectable({
  providedIn: 'root'
})
export class SelectSkillsService {

  constructor(
    private modalServ: ModalService,
    private skillsServ: SkillsService,
  ) { }

  openModal() {
    this.modalServ.openModal(SelectSkillsComponent, '').subscribe(
      w => this.skillsServ.addSkill(w)
    );
  }

}
