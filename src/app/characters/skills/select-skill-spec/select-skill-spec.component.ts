import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SkillSpecInterface, skillsSpecUtil } from '../skills.util';

@Component({
  selector: 'app-select-skill-spec',
  templateUrl: './select-skill-spec.component.html',
  styleUrls: ['./select-skill-spec.component.css']
})
export class SelectSkillSpecComponent {

  constructor() {}

  csoportok: Array<string> = [
    'Aktív szakértelmek',
    'Ismeret szakértelmek',
    'Nyelvi szakértelmek'
  ];

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  mainSkill: string = '';

  loadData(modalData: any): void {
    this.mainSkill = modalData.mainSkill;
  }

  getSpecs(): Array<SkillSpecInterface> {
    const specs = skillsSpecUtil.filter(x=>x.spec == this.mainSkill);
    return specs;
  }

  onSave(nev: string) {
    this.closeEvent.next(nev),
    this.closeEvent.complete()
  }

  onClose() {
    this.closeEvent.complete();
  }

}
