import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SkillInterface, skillsUtil } from '../skills.util';
import { attributesUtil } from '../../attributes/attributes-utility';

@Component({
  selector: 'app-select-skill',
  templateUrl: './select-skill.component.html',
  styleUrls: ['./select-skill.component.css']
})
export class SelectSkillComponent {

  constructor() {}

  csoportok: Array<string> = [
    'Aktív szakértelmek',
    'Ismeret szakértelmek',
    'Nyelvi szakértelmek'
  ];

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  getSkills(csoport: string):Array<SkillInterface> {
    const filteredSkills = skillsUtil.filter(x=>x.csoport == csoport);
    return filteredSkills;
  }

  getAttrRovid(fcName: string): string {
    const rovid = attributesUtil.filter(x=>x.fcName == fcName).map(x=>x.rovidnev)[0];
    return rovid;
  }

  loadData() {
  }

  onSave(nev: string, multi: boolean) {
    if (multi == false) {
      return [
        this.closeEvent.next([nev, '']),
        this.closeEvent.complete()
      ];
    }
    const input = (<HTMLInputElement>document.getElementById(nev)).value;
    return [
      this.closeEvent.next([nev, input]),
      this.closeEvent.complete()
    ]
  }

  onClose() {
    this.closeEvent.complete();
  }

}
