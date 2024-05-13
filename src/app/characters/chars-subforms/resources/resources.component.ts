import { Component, OnInit } from '@angular/core';
import {ResourcesService } from './resources.service';
import { karmaUtil, tokeUtil } from './resources-utility';
import { LevelcontrolService } from 'src/app/elements/Inputs/levelcontrol/levelcontrol.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  constructor(
    public s: ResourcesService,
    public lvlContServ: LevelcontrolService
  ) { }

  getKarmaU() {
    return karmaUtil;
  }

  getTokeU() {
    return tokeUtil;
  }

  ngOnInit(): void {
  }
}
