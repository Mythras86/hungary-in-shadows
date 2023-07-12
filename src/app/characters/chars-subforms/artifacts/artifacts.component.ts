import { Component } from '@angular/core';
import { ArtifactsService } from './artifacts.service';
import { ResourcesService } from '../resources/resources.service';
import { FormArray } from '@angular/forms';
import { SelectArtifactService } from 'src/app/elements/modals/select-artifacts/select-artifacts.service';
import { LevelcontrolService } from 'src/app/elements/modals/levelcontrol/levelcontrol.service';

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.css']
})
export class ArtifactsComponent {

  constructor(
    public artifactsServ: ArtifactsService,
    public resServ: ResourcesService,
    public sArtifServ: SelectArtifactService,
    public lvlContServ: LevelcontrolService
  ) { }

  public get artifacts(): FormArray | null | any {
    if(!this.artifactsServ.artifactsForm) {
      return null;
    }
    return this.artifactsServ.artifactsForm.controls['artifacts'] as FormArray;
  }

  getCsoportok():Array<any> {
    const form = (this.artifactsServ.artifactsForm.get('artifacts') as FormArray);
    const csoportArr = Object.values(form.controls).map(x => x.value).map(x => x.csoport);
    const csopArrUniq = [...new Set(csoportArr.map(x=> x))];
    return csopArrUniq;
  }

  getControls() {
    const controls = (this.artifactsServ.artifactsForm.get('artifacts') as FormArray).controls;
    return controls;
  }

  ngOnInit(): void {
    this.artifactsServ.createArtifacts();
  }
}

