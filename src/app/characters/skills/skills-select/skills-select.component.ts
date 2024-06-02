import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { SkillsSelectService } from './skills-select.service';

@Component({
  selector: 'app-skills-select',
  templateUrl: './skills-select.component.html',
  styleUrls: ['./skills-select.component.scss']
})
export class SkillsSelectComponent {
  constructor(
    public s: SkillsSelectService,
  ) {}

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  filter: string = 'Nincs';

  loadData(): void {
  }

  setFilter(setToThis: string): void {
    this.filter = setToThis;
  }

  onSave(skill:string) {
    this.closeEvent.next(skill);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.complete();
  }

}
