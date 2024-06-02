import { Component } from '@angular/core';
import { SkillsService } from '../skills.service';
import { FormArray } from '@angular/forms';
import { DetailsService } from '../../details/details.service';
import { ResourcesService } from '../../resources/resources.service';
import { skillsUtil } from '../skills.util';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';
import { SkillsSelectService } from '../skills-select/skills-select.service';

@Component({
  selector: 'app-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrls: ['./skills-list.component.scss']
})
export class SkillsListComponent {

  constructor(
    public s: SkillsService,
    private detailsS: DetailsService,
    public resS: ResourcesService,
    public select: ItemSelectService,
    public selSkills: SkillsSelectService
  ) { }

  public get skills(): FormArray | null | any {
    if(!this.s.skillsForm) {
      return null;
    }
    return this.s.skillsForm.controls['skills'] as FormArray;
  }

  getCsoportok():Array<any> {
    const form = (this.s.skillsForm.get('skills') as FormArray);
    const csoportArr = Object.values(form.controls).map(x => x.value).map(x => x.csoport);
    const csopArrUniq = [...new Set(csoportArr.map(x=> x))];
    csopArrUniq.sort();
    return csopArrUniq;
  }

  getMegjFromUtil(skillnev: string): Array<any> {
    const megjegyzes = skillsUtil.filter(x => x.nev == skillnev).map(x => x.megjegyzes);
    return megjegyzes;
  }

  getKarmaCost(csoport: string): number {
    if (csoport == 'Ismeret' || csoport == 'Nyelvi') {
      return 1;
    }
    return 2;
  }

  anyanyelvChangeDetector() {
    const anyanyelv = this.detailsS.detailsForm.get('anyanyelv');
    const skill = (this.s.skillsForm.get('skills') as FormArray);
    const iNyelv = skill?.value.map((x:any)=>x.nev).indexOf('Anyanyelvi beszéd')
    const iIras = skill?.value.map((x:any)=>x.nev).indexOf('Anyanyelvi Í/O')
    anyanyelv?.valueChanges.subscribe(w =>{
      skill.at(iNyelv).get('megjegyzes')?.patchValue(w),
      skill.at(iIras).get('megjegyzes')?.patchValue(w)
    });
  }

  ngOnInit(): void {
    this.anyanyelvChangeDetector();
  }

}
