import { Component, OnInit } from '@angular/core';
import { SkillsService } from './skills.service';
import { LevelcontrolService } from 'src/app/elements/modals/levelcontrol/levelcontrol.service';
import { skillsUtil } from './skills.util';
import { FormArray, FormControl} from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { SelectSkillsService } from 'src/app/elements/modals/select-skills/select-skills.service';
import { InputModalService } from 'src/app/elements/modals/input-modal/input-modal.service';
import { DetailsService } from '../details/details.service';
import { SortMeService } from 'src/app/elements/sortme/sort-me.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  constructor(
    public skillsServ: SkillsService,
    public detailssServ: DetailsService,
    public inputModServ: InputModalService,
    public lvlContServ: LevelcontrolService,
    public resServ: ResourcesService,
    public selSkillsModalServ: SelectSkillsService,
    private sortServ: SortMeService
  ) { }

  public get skills(): FormArray | null | any {
    if(!this.skillsServ.skillsForm) {
      return null;
    }
    return this.skillsServ.skillsForm.controls['skills'] as FormArray;
  }

  getCsoportok():Array<any> {
    const form = (this.skillsServ.skillsForm.get('skills') as FormArray);
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
    const anyanyelv = this.detailssServ.detailsForm.get('anyanyelv');
    const skill = (this.skillsServ.skillsForm.get('skills') as FormArray);
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
