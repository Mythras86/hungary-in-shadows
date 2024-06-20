import { Component } from '@angular/core';
import { FormArray } from '@angular/forms';
import { DetailsService } from '../details/details.service';
import { ResourcesService } from '../resources/resources.service';
import { SkillsService } from './skills.service';
import { SkillInterface, skillsUtil } from './skills.util';
import { Subject } from 'rxjs';
import { SkillsModel } from './skills.model';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

  constructor(
    public s: SkillsService,
    public select: ItemSelectService,
    private detailsS: DetailsService,
    public resS: ResourcesService,
  ) {
    this.skillsList = skillsUtil;
    this.skillCsoportok = [...new Set(skillsUtil.map(x=> x.csoport))];
  }

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  filter: string = 'Nincs';

  skillsList: Array<SkillInterface> = [];
  skillCsoportok: Array<string> = [];

  loadData(): void {
  }

  setFilter(setToThis: string): void {
    this.filter = setToThis;
  }

  onSave(data: Array<string>) {
    this.closeEvent.next([data[0], data[1]]);
    this.closeEvent.complete();
    this.s.selectMode = false;
  }

  onClose() {
    this.closeEvent.complete();
    this.s.selectMode = false;
  }

  public get skills(): FormArray | null | any {
    if(!this.s.skillsForm) {
      return null;
    }
    return this.s.skillsForm.controls['skills'] as FormArray;
  }

  sortedSkills(): Array<SkillsModel> {
    this.skills.setValue(
      this.skills.value.sort((a:any, b:any) =>
        {
          if (a['nev'] > b['nev']) return 1;
          if (a['nev'] < b['nev']) return -1;
          return 0;
        }
    ));
    return this.skills.value
  }

  getCsoportok():Array<string> {
    const skills: Array<any> = [...new Set(this.skills.value.map((x:SkillsModel) => x.csoport))];
    return skills;
  }

  anyanyelvChangeDetector(): void {
    const anyanyelv = this.detailsS.detailsForm.get('anyanyelv');
    const iNyelv = this.skills.value.map((x:any)=>x.nev).indexOf('Anyanyelvi beszéd')
    const iIras = this.skills.value.map((x:any)=>x.nev).indexOf('Anyanyelvi Í/O')
    anyanyelv?.valueChanges.subscribe(w =>{
      this.skills.at(iNyelv).get('nevKieg')?.patchValue(w),
      this.skills.at(iIras).get('nevKieg')?.patchValue(w)
    });
  }

  ngOnInit(): void {
    this.anyanyelvChangeDetector();
  }

}
