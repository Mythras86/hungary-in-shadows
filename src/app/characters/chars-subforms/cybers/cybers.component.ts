import { Component, OnInit } from '@angular/core';
import { CybersService } from './cybers.service';
import { ResourcesService } from '../resources/resources.service';
import { SelectCyberService } from 'src/app/elements/modals/select-cybers/select-cybers.service';
import { FormArray } from '@angular/forms';
import { LevelcontrolService } from 'src/app/elements/modals/levelcontrol/levelcontrol.service';
import { AttributesService } from '../attributes/attributes.service';
import { SortMeService } from 'src/app/elements/sortme/sort-me.service';

@Component({
  selector: 'app-cybers',
  templateUrl: './cybers.component.html',
  styleUrls: ['./cybers.component.css']
})
export class CybersComponent implements OnInit {

  constructor(
    public cybersServ: CybersService,
    public resServ: ResourcesService,
    public attrServ: AttributesService,
    public sCyberServ: SelectCyberService,
    public lvlContServ: LevelcontrolService,
    private sortServ: SortMeService
  ) { }

  public get cybers(): FormArray | null | any {
    if(!this.cybersServ.cybersForm) {
      return null;
    }
    return this.cybersServ.cybersForm.controls['cybers'] as FormArray;
  }

  getCsoportok():Array<any> {
    const form = (this.cybersServ.cybersForm.get('cybers') as FormArray);
    const csoportArr = Object.values(form.controls).map(x => x.value).map(x => x.csoport);
    const csopArrUniq = [...new Set(csoportArr.map(x=> x))];
    csopArrUniq.sort();
    return csopArrUniq;
  }

  ngOnInit(): void {
  }
}
