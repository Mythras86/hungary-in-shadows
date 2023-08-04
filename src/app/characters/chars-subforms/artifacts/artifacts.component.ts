import { Component, OnInit } from '@angular/core';
import { ArtifactsService } from './artifacts.service';
import { ResourcesService } from '../resources/resources.service';
import { FormArray } from '@angular/forms';
import { SelectArtifactService } from 'src/app/elements/modals/select-artifacts/select-artifacts.service';
import { LevelcontrolService } from 'src/app/elements/modals/levelcontrol/levelcontrol.service';
import { SortMeService } from 'src/app/elements/sortme/sort-me.service';

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.css']
})
export class ArtifactsComponent implements OnInit {

  constructor(
    public artifactsServ: ArtifactsService,
    public resServ: ResourcesService,
    public sArtifServ: SelectArtifactService,
    public lvlContServ: LevelcontrolService,
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
    csopArrUniq.sort();
    return csopArrUniq;
  }

  getControls() {
    const controls = (this.artifactsServ.artifactsForm.get('artifacts') as FormArray).controls;
    return controls;

  }

  changePlace(i: number) {
    const elhelyezes = (this.artifactsServ.artifactsForm.get('artifacts') as FormArray).at(i).get('elhelyezes');

    if (elhelyezes?.value == 'raktár') {
      return elhelyezes.patchValue('táska');
    }
    if (elhelyezes?.value == 'táska') {
      return elhelyezes.patchValue('viselt')
    }
    return elhelyezes?.patchValue('raktár');
  }


  ngOnInit(): void {
    this.artifactsServ.createArtifacts();
  }
}

