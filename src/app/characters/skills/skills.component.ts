import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DetailsService } from '../details/details.service';
import { ResourcesService } from '../resources/resources.service';
import { SkillsService } from './skills.service';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { SelectSkillComponent } from './select-skill/select-skill.component';
import { SelectSkillSpecComponent } from './select-skill-spec/select-skill-spec.component';
import { LevelcontrolComponent } from 'src/app/elements/levelcontrol/levelcontrol.component';
import { SkillInterface, skillsUtil } from './skills.util';
import { AttributesService } from '../attributes/attributes.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

  constructor(
    public s: SkillsService,
    public select: ItemSelectService,
    public resS: ResourcesService,
    private detailsS: DetailsService,
    private attrsS: AttributesService,
    public modalS: ModalService,
  ) {
    this.csoportok = [
      'Aktív szakértelmek',
      'Ismeret szakértelmek',
      'Nyelvi szakértelmek'
    ];
  }

  public get skills(): FormArray | null | any {
    if(!this.s.skillsForm) {
      return null;
    }
    return this.s.skillsForm.controls['skills'] as FormArray;
  }

  csoportok: Array<string> = [];

  csoportCheck(elem: string): boolean {
    const skills = (this.s.skillsForm.get('skills') as FormArray);
    const csoport: Array<string> = Object.values(skills.controls).map(x => x.value).map(x => x.csoport);

    if (csoport.some(x=>x == elem)){
      return true;
    }
    return false;
  }

  getSpecs(i: number): FormArray | null | any {
    if(!this.s.skillsForm) {
      return null;
    }
    return (((this.s.skillsForm.controls['skills'] as FormArray).at(i) as FormGroup).get('specs') as FormArray)?.value;
  }

  newSkill(): void {
    const ownedSkills: Array<string> = Object.values(this.skills.controls).map((x:any) => x.value).map(x => x.nev);
    this.modalS.openModal(SelectSkillComponent, {ownedSkills: ownedSkills, karma: this.resS.getSzabadKarma()}).subscribe(
      w => this.s.addSkill(w[0], w[1])
    );
  }

  newSpec(nev: string, i: number): void {
    const ownedSpecs: Array<string> = Object.values(this.skills.controls[i].controls.specs.controls).map((x:any) => x.value).map(x => x.nev);;
    this.modalS.openModal(SelectSkillSpecComponent, {mainSkill: nev, ownedSpecs: ownedSpecs}).subscribe(
      w => this.s.addSpec(w, i)
    );
  }

  skillLvlUp(nev: string, i: number): void {
    const skill: SkillInterface = skillsUtil.filter(x=>x.nev == nev)[0];
    this.modalS.openModal(LevelcontrolComponent, {
    fejlec: skill.nev,
    megjegyzes: 'van',
    lepes: 5,
    valto: 1,
    tokeKtsg: 0,
    karmaKtsg: skill.karmaKtsg,
    esszKtsg: 0,
    celErtek: this.s.getFc(i, 'szint').value,
    egyseg: ' Szint',
    minErtek: this.s.getFc(i, 'szint').value,
    maxErtek: this.attrsS.getFc(skill.kapTul).value,
    }).subscribe(
      w => this.lvlUp(w, i)
    );
  }

  lvlUp(valtozas: number, i: number): void {
    const form = ((this.s.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get('szint');
    // kifizetés
    this.resS.payKarma(valtozas*3);
    // értékszerzés
    form?.patchValue(form.value+valtozas);
  }

  anyanyelvChangeDetector(): void {
    const anyanyelv = this.detailsS.detailsForm.get('anyanyelv');
    const iNyelv = this.skills.value.map((x:any)=>x.nev).indexOf('Anyanyelv')
    const iIras = this.skills.value.map((x:any)=>x.nev).indexOf('Írás/olvasás')
    anyanyelv?.valueChanges.subscribe(w =>{
      this.skills.at(iNyelv).get('nevKieg')?.setValue(w),
      this.skills.at(iIras).get('nevKieg')?.setValue(w)
    });
  }

  ngOnInit(): void {
    this.anyanyelvChangeDetector();
  }

}
