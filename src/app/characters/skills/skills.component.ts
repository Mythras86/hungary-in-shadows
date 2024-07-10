import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DetailsService } from '../details/details.service';
import { ResourcesService } from '../resources/resources.service';
import { SkillsService } from './skills.service';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { SelectSkillComponent } from './select-skill/select-skill.component';
import { AttributesService } from '../attributes/attributes.service';
import { SkillSpecFG } from './skills.model';
import { first } from 'rxjs';

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
  csoportok: Array<string> = [];

  public get skills(): FormArray | null | any {
    if(!this.s.skillsForm) {
      return null;
    }
    return this.s.skillsForm.controls['skills'] as FormArray;
  }

  getSpecs(i: number): FormArray<SkillSpecFG> {
    const specs = ((this.s.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get('specs') as FormArray;
    return specs;
  }

  getTulSzint(fcName: string): number {
    const fcValue = this.attrsS.getFc(fcName).value;
    const szint = Math.floor(fcValue/2);
    return szint;
  }

  // sortSkills(): Array<SkillsModel> {
  //   const lol = this.skills.value.sort((a:SkillsModel, b:SkillsModel) => {
  //     const nameA = a.nev.toUpperCase();
  //     const nameB = b.nev.toUpperCase();
  //     if (nameA < nameB) {
  //       return -1;
  //     }
  //     if (nameA > nameB) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //   return lol;
  // }


  newSkill(): void {
    const ownedSkillsId: Array<string> = Object.values(this.skills.controls).map((x:any) => x.value).map(x => x.id);
    this.modalS.openModal(SelectSkillComponent, {ownedSkillsId: ownedSkillsId, karma: this.resS.getSzabadKarma()}).subscribe(
      w => this.s.addSkill(w[0], w[1])
    );
  }

  anyanyelvChangeDetector(): void {
    const anyanyelv = this.detailsS.detailsForm.get('anyanyelv');
    anyanyelv?.valueChanges.pipe(first()).subscribe(() => this.s.addFirstLanguage(anyanyelv.value) );
  }

  ngOnInit(): void {
    this.anyanyelvChangeDetector()
    this.s.skillsForm.valueChanges.subscribe(
      ()=>console.log(this.skills.value)
    )
  }

}
