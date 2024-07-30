import { Component, Input, OnInit } from '@angular/core';
import { SkillSpecModel } from '../skills.model';
import { LevelcontrolComponent } from 'src/app/elements/levelcontrol/levelcontrol.component';
import { SkillSpecInterface, skillsSpecUtil } from '../skills.util';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { SkillsService } from '../skills.service';
import { ResourcesService } from '../../resources/resources.service';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';

@Component({
  selector: 'app-skillspec',
  templateUrl: './skillspec.component.html',
  styleUrls: ['./skillspec.component.scss']
})
export class SkillspecComponent implements OnInit {

  constructor(
    private resS: ResourcesService,
    private modalS: ModalService,
    public s: SkillsService,
    public select: ItemSelectService,
  ) {}

  @Input() spec!: SkillSpecModel;
  @Input() skillSzint: number = 0;
  @Input() kapTulSzint: number = 0;
  @Input() skillCsoport: string = '';
  @Input() i: number = 0;
  @Input() j: number = 0;

  attrBonus: number = 0;

  getAttrBonus(): number {
    const szint = Math.floor(this.kapTulSzint/2);
    return this.attrBonus = szint;
  }

  specLvlUp(): void {
    const spec: SkillSpecInterface = skillsSpecUtil.filter(x=>x.id == this.spec.id)[0];
    this.modalS.openModal(LevelcontrolComponent, {
    fejlec: spec.nev,
    megjegyzes: 'van',
    lepes: 2,
    valto: 1,
    tokeKtsg: 0,
    karmaKtsg: spec.karmaKtsg,
    esszKtsg: 0,
    celErtek: this.s.getFcLv2(this.skillCsoport, this.i, this.j, 'szint').value,
    egyseg: ' Szint',
    minErtek: this.s.getFcLv2(this.skillCsoport, this.i, this.j, 'szint').value,
    maxErtek: 3,
    }).subscribe(
      w => this.updateSpec(w)
    );
  }

  updateSpec(valtozas: number): void {
    const form = this.s.getFcLv2(this.skillCsoport, this.i, this.j, 'szint');
    // kifizetés
    this.resS.payKarma(valtozas*3);
    // értékszerzés
    form?.patchValue(form.value+valtozas);
  }

  ngOnInit(): void {
    this.getAttrBonus();
  }
}
