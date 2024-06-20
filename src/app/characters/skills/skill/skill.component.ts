import { Component, Input, } from '@angular/core';
import { SkillsService } from '../skills.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent {

  constructor(
    public s: SkillsService,
  ) {}

  @Input() nev: string = '';
  @Input() nevKieg: string = '';
  @Input() szint?: number = 0;
  @Input() kapTul: string = '';
  @Input() kapTulSzint?: number = 0;

}
