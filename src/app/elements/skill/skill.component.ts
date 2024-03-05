import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent {

  constructor(
  ) {}

  @Input() mode: string = '';

  @Input() nev: string = '';
  @Input() szint: number = 0;
  @Input() kapTul: string = '';
  @Input() kapTupSzint: number = 0;
  @Input() megjegyzes: string = '';

}
