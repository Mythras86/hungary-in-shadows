import { Component, Input, } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

  @Input() mode: string = '';

  @Input() nev: string = '';
  @Input() szint: number = 0;
  @Input() kapTul: string = '';
  @Input() kapTulSzint: number = 0;
  @Input() megjegyzes: string = '';

}
