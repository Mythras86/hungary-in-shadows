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

  karmabolTokeChangeDetector() {
    const karmabolToke = this.resServ.resourcesForm.get('karmabolToke');
    const elkolthetoToke = this.resServ.resourcesForm.get('elkolthetoToke');
    karmabolToke?.valueChanges.pipe(startWith(null), pairwise())
    .subscribe(([prev, next]: [any, any]) => {
      elkolthetoToke?.patchValue(elkolthetoToke.value+(next-prev)*7500)
    });
  }

  ngOnInit(): void {
    this.resServ.createResources();
    this.karmabolTokeChangeDetector();
  }
}
