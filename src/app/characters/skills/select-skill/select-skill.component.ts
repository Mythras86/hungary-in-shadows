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
    this.csoportok = [...new Set(skillsUtil.map(x => x.csoport))];
  }

  csoportokUtil: Array<any> = [];
  csoportok: Array<string> = [];

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  filter: string = '';
  ownedSkillsId: Array<string> = []
  karma: number = 0;

  skills: Array<SkillInterface> = []

  setFilter(keyWord: string):void {
    if (keyWord == '') {
      this.csoportok = [...new Set(skillsUtil.map(x => x.csoport))];
    } else {
      this.csoportok = [keyWord];
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

  getSkills(elem: string):Array<SkillInterface> {
    const skillsByCsoport = skillsUtil.filter(x=>x.csoport == elem);
    const karmaFilter = skillsByCsoport.filter(x=>x.karmaKtsg <= this.karma);
    const filteredSkills = karmaFilter.filter(x=> (!this.ownedSkillsId.includes(x.id) || x.multi == true ));
    return filteredSkills;
  }

  ngOnInit(): void {
  }
}
