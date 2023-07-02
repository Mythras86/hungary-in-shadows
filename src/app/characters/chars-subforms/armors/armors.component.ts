import { Component, OnInit } from '@angular/core';
import { ArmorsService } from './armors.service';
import { FormArray } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { SelectArmorService } from 'src/app/elements/modals/select-armors/select-armor.service';

@Component({
  selector: 'app-armors',
  templateUrl: './armors.component.html',
  styleUrls: ['./armors.component.css']
})
export class ArmorsComponent implements OnInit {

  constructor(
    public armorsServ: ArmorsService,
    public resServ: ResourcesService,
    public sArmorServ: SelectArmorService,
  ) { }

  public get armors(): FormArray | null | any {
    if(!this.armorsServ.armorsForm) {
      return null;
    }
    return this.armorsServ.armorsForm.controls['armors'] as FormArray;
  }

  getControls():Array<any> {
    const controls = (this.armorsServ.armorsForm.get('armors') as FormArray).controls;
    return controls;
  }

  ngOnInit(): void {
    this.armorsServ.createArmors();
  }
}
