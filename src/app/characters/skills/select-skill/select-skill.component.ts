import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SkillInterface, skillsUtil } from '../skills.util';
import { attributesUtil } from '../../attributes/attributes-utility';

@Component({
  selector: 'app-select-skill',
  templateUrl: './select-skill.component.html',
  styleUrls: ['./select-skill.component.css']
})
export class SelectSkillComponent {

  constructor() {
    this.csoportok = ['Aktív szakértelmek', 'Ismeret szakértelmek', 'Nyelvi szakértelmek'];
  }

  csoportok: Array<string> = [];

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  filter: string = 'Nincs';
  ownedSkills: Array<string> = []
  skills: Array<SkillInterface> = []
  karma: number = 0;

  setFilter(keyWord: string):void {
    const csoport: Array<string> = ['Aktív szakértelmek', 'Ismeret szakértelmek', 'Nyelvi szakértelmek'];
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
    this.ownedSkills = modalData.ownedSkills;
    this.karma = modalData.karma;
  }

  onSave(nev: string, nevKieg: string) {
    if (nev != '' && nevKieg == '') {
      return [
        this.closeEvent.next([nev, '']),
        this.closeEvent.complete()
      ]
    }
    const input = (<HTMLInputElement>document.getElementById(nevKieg)).value;
    if (nev == '' && nevKieg != '' && input != '') {
      return [
        this.closeEvent.next([input, nevKieg]),
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
    const filteredSkills = skillsByCsoport.filter(x=> !this.ownedSkills.includes(x.nev));
    return filteredSkills;
  }
}
