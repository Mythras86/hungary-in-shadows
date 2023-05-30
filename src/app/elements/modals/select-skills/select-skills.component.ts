import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { skillsUtil } from 'src/app/characters/chars-main/chars-subforms/skills/skills.util';

@Component({
  selector: 'app-select-skills',
  templateUrl: './select-skills.component.html',
  styleUrls: ['./select-skills.component.css']
})
export class SelectSkillsComponent {
  constructor( ) { }

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  getSkills(): Array<any> {
    return skillsUtil;
  }

  loadData(modalData: any): void {

  }

  onSave() {
    this.closeEvent.next();
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next(),
    this.closeEvent.complete()
  }

  ngOnInit(): void {
  }
}
