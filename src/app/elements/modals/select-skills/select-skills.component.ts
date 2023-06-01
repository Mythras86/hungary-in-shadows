import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { skillsUtil } from 'src/app/characters/chars-main/chars-subforms/skills/skills.util';

@Component({
  selector: 'app-select-skills',
  templateUrl: './select-skills.component.html',
  styleUrls: ['./select-skills.component.css']
})
export class SelectSkillsComponent {
[x: string]: any;
  constructor( ) { }

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  getSkills(): Array<any> {
    return skillsUtil;
  }

  getCsoport(nev: string) {
    const csoport = skillsUtil.filter(x => x.nev == nev).map(x => x.csoport)[0];
    console.log(csoport);
    return csoport;
  }

  loadData(modalData: any): void {

  }

  selectSkill(skill: string) {
    this.closeEvent.next(skill);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next(''),
    this.closeEvent.complete()
  }

  ngOnInit(): void {
  }
}
