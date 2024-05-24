import { Component, OnInit } from '@angular/core';
import { CybersService } from './cybers.service';
import { ResourcesService } from '../../resources/resources.service';
import { SelectCyberService } from 'src/app/elements/modals/select-cybers/select-cybers.service';
import { FormArray } from '@angular/forms';
import { AttributesService } from '../../attributes/attributes.service';

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

  getMinoseg(i:number):string {
    if (i == 3) {
      return 'Delta';
    }
    if (i == 2) {
      return 'Béta';
    }
    if (i == 1) {
      return 'Alfa';
    }
      return 'hiba';
  }

  ngOnInit(): void {
  }
}
