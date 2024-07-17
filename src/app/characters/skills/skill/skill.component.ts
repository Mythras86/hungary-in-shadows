import { Component, Input, OnInit } from '@angular/core';
import { SkillsService } from '../skills.service';
import { SkillsModel } from '../skills.model';
import { AttributesService } from '../../attributes/attributes.service';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';
import { skillsSpecUtil, skillsUtil } from '../skills.util';
import { FormArray, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { LevelcontrolComponent } from 'src/app/elements/levelcontrol/levelcontrol.component';
import { ResourcesService } from '../../resources/resources.service';
import { SelectSkillSpecComponent } from '../select-skill-spec/select-skill-spec.component';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit{

  constructor(
    public s: SkillsService,
    public select: ItemSelectService,
    private attrS: AttributesService,
    private resS: ResourcesService,
    private modalS: ModalService,
  ) { }

  @Input() skill!: SkillsModel;
  @Input() kapTulSzint: number = 0;
  @Input() i: number = 0;

  getAttrBonus(): number {
    const szint = Math.floor(this.kapTulSzint/2);
    return szint;
  }

  hasSpec(skillId: string):boolean {
    if (skillsSpecUtil.find(x=>x.specOf == skillId)) {
      return true;
    }
    return false;
  }

  skillLvlUp(): void {
    const skill = skillsUtil.filter(x=>x.id == this.skill.id)[0];
    this.modalS.openModal(LevelcontrolComponent, {
    fejlec: skill.nev + ' ' + skill.nevKieg,
    megjegyzes: 'van',
    lepes: 5,
    valto: 1,
    tokeKtsg: 0,
    karmaKtsg: skill.karmaKtsg,
    esszKtsg: 0,
    celErtek: this.s.getFc(skill. csoport, this.i, 'szint').value,
    egyseg: ' Szint',
    minErtek: this.s.getFc(skill. csoport, this.i, 'szint').value,
    maxErtek: this.attrS.getFc(skill.kapTul).value,
    }).subscribe(
      w => this.updateSkill(w, skill.csoport)
    );
  }

  updateSkill(valtozas: number, skillCsoport: string): void {
    const form = ((this.s.skillsForm.get(skillCsoport) as FormArray).at(this.i) as FormGroup).get('szint');
    // kifizetés
    this.resS.payKarma(valtozas*3);
    // értékszerzés
    form?.patchValue(form.value+valtozas);
  }

  newSpec(skillCsoport: string, id: string, i: number): void {
    const ownedSpecs: Array<string> = Object.values(((this.s.skillsForm.get(skillCsoport) as FormArray).at(this.i) as FormGroup)).map((x:any) => x.value).map(x => x.id);
    console.log(ownedSpecs)
    this.modalS.openModal(SelectSkillSpecComponent, {mainSkillId: id, ownedSpecs: ownedSpecs}).subscribe(
      w => this.s.addSpec(skillCsoport, w, i)
    );
  }

  ngOnInit(): void {
  }
}
