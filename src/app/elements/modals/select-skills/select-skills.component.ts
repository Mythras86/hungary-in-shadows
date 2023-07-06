import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { skillsUtil } from 'src/app/characters/chars-subforms/skills/skills.util';

@Component({
  selector: 'app-select-skills',
  templateUrl: './select-skills.component.html',
  styleUrls: ['./select-skills.component.css']
})
export class SelectSkillsComponent {

  constructor( ) { }

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  skillFilter: string = 'Nincs';

  loadData(modalData: any): void {
  }

  getSkills(csoport: string): Array<any> {
    const skills = skillsUtil.filter(x=> x.csoport == csoport);
    return skills;
  }

  getCsoportok(): Array<any> {
    const csoport = [...new Set(skillsUtil.map(x=> x.csoport))];
    return csoport;
  }

  getFilteredCsoportok(): Array<any> {
    if (this.skillFilter == 'Nincs') {
      return this.getCsoportok();
    }
    return [this.skillFilter];
  }

  selectFilter(status: string) {
    return this.skillFilter = status;
  }

  selectSkill(nev: string, csoport: string, tul: string) {
    this.closeEvent.next([nev, csoport, tul]);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next(''),
    this.closeEvent.complete()
  }

  ngOnInit(): void {
  }
}
