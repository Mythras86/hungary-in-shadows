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
    public resS: ResourcesService,
    public lvlContServ: LevelcontrolService
  ) { }

  private alapKarma = this.resS.resourcesForm.get('alapKarma');
  private szerzettKarma = this.resS.resourcesForm.get('szerzettKarma');
  private elkoltottKarma = this.resS.resourcesForm.get('elkoltottKarma');
  private szabadKarma = this.resS.resourcesForm.get('szabadKarma');
  private alapToke = this.resS.resourcesForm.get('alapToke');
  private szerzettToke = this.resS.resourcesForm.get('szerzettToke');
  private elkoltottToke = this.resS.resourcesForm.get('elkoltottToke');
  private szabadToke = this.resS.resourcesForm.get('szabadToke');

  getKarmaU() {
    return karmaUtil;
  }

  getTokeU() {
    return tokeUtil;
  }

  detectChange(): void {
    this.szerzettKarma?.valueChanges.subscribe(x => this.sumKarma());
    this.elkoltottKarma?.valueChanges.subscribe(x => this.sumKarma());
    this.szerzettToke?.valueChanges.subscribe(x => this.sumToke());
    this.elkoltottToke?.valueChanges.subscribe(x => this.sumToke());
  }

  sumKarma(): void {
    this.szabadKarma?.patchValue(this.alapKarma?.value + this.szerzettKarma?.value + this.elkoltottKarma?.value);
  }

  sumToke(): void {
    this.szabadToke?.patchValue(this.alapToke?.value + this.szerzettToke?.value + this.elkoltottToke?.value);
  }

  ngOnInit(): void {
    this.sumKarma();
    this.sumToke();
    this.detectChange();
  }
}
