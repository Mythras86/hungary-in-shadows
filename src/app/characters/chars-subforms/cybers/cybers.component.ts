import { Component } from '@angular/core';
import { CybersService } from './cybers.service';
import { ResourcesService } from '../resources/resources.service';
import { SelectCyberService } from 'src/app/elements/modals/select-cybers/select-cybers.service';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-cybers',
  templateUrl: './cybers.component.html',
  styleUrls: ['./cybers.component.css']
})
export class CybersComponent {

  constructor(
  public cybersServ: CybersService,
  public resServ: ResourcesService,
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
  return csopArrUniq;
}

getControls() {
  const controls = (this.cybersServ.cybersForm.get('cybers') as FormArray).controls;
  return controls;
}

ngOnInit(): void {
  this.cybersServ.createCybers();
}
}
