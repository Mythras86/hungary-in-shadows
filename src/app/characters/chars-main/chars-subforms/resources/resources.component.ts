import { Component, OnInit } from '@angular/core';
import { resUtil } from './resources-utility';
import {ResourcesService } from './resources.service';
import { LevelcontrolService } from 'src/app/elements/modals/levelcontrol/levelcontrol.service';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  constructor(
    public resServ:ResourcesService,
    public lvlContServ: LevelcontrolService,
  ) { }

  getResUtil() {
    return resUtil;
  }

  getFcPath(fcName: string):any {
    return this.resServ.resourcesForm.get(fcName);
  }

  getFcValue(fcName: string):any {
    return this.resServ.resourcesForm.get(fcName)?.value;
  }

  ngOnInit(): void {
    this.resServ.createResources();
  }
}
