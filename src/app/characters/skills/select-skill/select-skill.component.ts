import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SkillInterface, skillsUtil } from '../skills.util';
import { attributesUtil } from '../../attributes/attributes-utility';

@Component({
  selector: 'app-select-skill',
  templateUrl: './select-skill.component.html',
  styleUrls: ['./select-skill.component.scss']
})
export class SelectSkillComponent implements OnInit {

  constructor() {
    this.csoportok = ['activeSkills', 'knowledgeSkills', 'languageSkills'];
  }

  csoportok: Array<string> = [];

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  filter: string = 'Nincs';
  ownedSkillsId: Array<string> = []
  skills: Array<SkillInterface> = []
  karma: number = 0;

  setFilter(keyWord: string):void {
    const csoport: Array<string> = ['activeSkills', 'knowledgeSkills', 'languageSkills'];
    this.filter = keyWord;
    if (this.filter == 'Nincs') {
      this.csoportok = csoport;
    } else {
      this.csoportok = csoport.filter(x=>x == keyWord);
    }
  }

  getAttrRovid(fcName: string): string {
    const rovid = attributesUtil.filter(x=>x.fcName == fcName).map(x=>x.rovidnev)[0];
    return rovid;
  }

  loadData(modalData: any) {
    this.ownedSkillsId = modalData.ownedSkillsId;
    this.karma = modalData.karma;
  }

  onSave(skill: SkillInterface) {
    if (skill.nev != '' && skill.nevKieg == '') {
      return [
        this.closeEvent.next([skill, '']),
        this.closeEvent.complete()
      ]
    }
    const input = (<HTMLInputElement>document.getElementById(skill.id)).value;
    if (skill.nev == '' && skill.nevKieg != '' && input != '') {
      return [
        this.closeEvent.next([skill, input]),
        this.closeEvent.complete()
      ]
    }
    return
  }

  onClose() {
    this.closeEvent.complete();
  }

  getSkills(csoport: string):Array<SkillInterface> {
    const karmaFilter = skillsUtil.filter(x=>x.karmaKtsg <= this.karma);
    const skillsByCsoport = karmaFilter.filter(x=>x.csoport == csoport);
    const filteredSkills = skillsByCsoport.filter(x=> (!this.ownedSkillsId.includes(x.id) || x.multi == true ));
    return filteredSkills;
  }

  ngOnInit(): void {
  }
}
