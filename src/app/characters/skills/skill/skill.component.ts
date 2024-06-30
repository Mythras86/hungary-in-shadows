import { Component, Input, OnInit } from '@angular/core';
import { SkillsService } from '../skills.service';
import { SkillSpecModel } from '../skills.model';
import { attributesUtil } from '../../attributes/attributes-utility';
import { AttributesService } from '../../attributes/attributes.service';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit{

  constructor(
    public s: SkillsService,
    private attrsS: AttributesService,
  ) { }

  @Input() nev: string = '';
  @Input() nevKieg: string = '';
  @Input() szint: number = 0;
  @Input() kapTul: string = '';
  @Input() kapTulSzint: number = 0;

  @Input() specs: Array<SkillSpecModel> = [];

  setNevKieg: string = '';

  getNevKieg(): string {
    if (this.nevKieg == '') {
      return '';
    }
    return ':'+this.nevKieg;
  }

  getAttrRovid(fcName: string): string {
    const rovid = attributesUtil.filter(x=>x.fcName == fcName).map(x=>x.rovidnev)[0];
    return rovid;
  }

  getTulSzint(fcName: string): number {
    const fcValue = this.attrsS.getFc(fcName).value;
    const szint = Math.floor(fcValue/2);
    return szint;
  }

  ngOnInit(): void {
    this.setNevKieg = this.getNevKieg();
  }
}
