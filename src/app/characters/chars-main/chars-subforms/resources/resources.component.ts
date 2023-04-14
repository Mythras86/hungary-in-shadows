import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { resUtil } from './resources-utility';
import {ResourcesService } from './resources.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class CharResourcesComponent implements OnInit {

  constructor(
    private resServ:ResourcesService
  ) {

  }

  getResUtil() {
    return resUtil;
  }

  getForm(): FormGroup {
    return this.resServ.resourcesForm;
  }

  getFcValue(fcName: any):any {
    return this.resServ.resourcesForm.get(fcName)?.value
  }

  ngOnInit(): void {
    this.resServ.createResources();
  }
}
