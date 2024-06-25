import { Component } from '@angular/core';
import { FormArray } from '@angular/forms';
import { DetailsService } from '../details/details.service';
import { ResourcesService } from '../resources/resources.service';
import { SkillsService } from './skills.service';
import { Subject } from 'rxjs';
import { SkillsFG, SkillsModel } from './skills.model';
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
    this.csoportok = [
      'Aktív szakértelmek',
      'Ismeret szakértelmek',
      'Nyelvi szakértelmek'
    ];
  }

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  filter: string = 'Nincs';
  csoportok: Array<string> = [];

  setFilter(setToThis: string): void {
    this.filter = setToThis;
  }

  public get skills(): FormArray | null | any {
    if(!this.s.skillsForm) {
      return null;
    }
    return this.s.skillsForm.controls['skills'] as SkillsFG;
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

  anyanyelvChangeDetector(): void {
    const anyanyelv = this.detailsS.detailsForm.get('anyanyelv');
    const iNyelv = this.skills.value.map((x:any)=>x.nev).indexOf('Anyanyelv')
    const iIras = this.skills.value.map((x:any)=>x.nev).indexOf('Írás/olvasás')
    anyanyelv?.valueChanges.subscribe(w =>{
      this.skills.at(iNyelv).get('nev')?.setValue('Anyanyelv: '+w),
      this.skills.at(iIras).get('nev')?.setValue('Írás/olvasás: '+w)
    });
  }

  ngOnInit(): void {
    this.anyanyelvChangeDetector();
  }

}
