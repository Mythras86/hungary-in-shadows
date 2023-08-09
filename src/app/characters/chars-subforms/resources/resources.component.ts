import { Component, OnInit } from '@angular/core';
import { resUtil } from './resources-utility';
import {ResourcesService } from './resources.service';
import { LevelcontrolService } from 'src/app/elements/modals/levelcontrol/levelcontrol.service';
import { pairwise, startWith } from 'rxjs';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  constructor(
    public resServ: ResourcesService,
    public lvlContServ: LevelcontrolService,
  ) { }

  getResUtil() {
    return resUtil;
  }

  ngOnInit(): void {
    this.resServ.karmabolTokeChangeDetector();
  }
}
