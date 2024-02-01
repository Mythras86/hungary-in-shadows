import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { ArtifactsModel } from './artifacts.model';

@Injectable({
  providedIn: 'root'
})
export class ArtifactsService {

  constructor(
    private fb: FormBuilder,
    private resServ: ResourcesService,
  ) { }

  artifactsForm!: FormGroup;

  createArtifacts(): FormGroup {
    const artifacts = {
      artifacts: this.fb.array([]),
    };
    return this.artifactsForm = this.fb.group(artifacts);
  }

  setArtifacts(dataset: any[]): FormArray {
    const artifacts = (this.artifactsForm.get('artifacts') as FormArray);
    dataset.forEach(e => {
      artifacts.push(
        this.fb.group({
          _id: e._id,
          nev: e.nev,
          csoport: e.csoport,
          maxSzint: e.maxSzint,
          szint: e.szint,
          ar: e.ar,
          karma: e.karma,
          elhelyezes: e.elhelyezes,
          megjegyzes: e.megjegyzes,
        }))
    });
    return artifacts;
  }

  addArtifact(a: ArtifactsModel): void {
    if (a.nev == null) {
      return;
    }
    const artifact = this.fb.group({
      _id: [a._id, Validators.required],
      nev: [a.nev, Validators.required],
      csoport: [a.csoport, Validators.required],
      maxSzint: [a.maxSzint, Validators.required],
      szint: [1, Validators.required],
      ar: [a.ar, Validators.required],
      karma: [a.karma, Validators.required],
      elhelyezes: ['raktár', Validators.required],
      megjegyzes: [a.megjegyzes, Validators.required],
    });
    this.resServ.payToke(a.ar);
    this.resServ.payKarma(a.karma);
    (this.artifactsForm.get('artifacts') as FormArray).push(artifact);
  }

  removeArtifact(i:number): void {
    const arVissza = (this.artifactsForm.get('artifacts') as FormArray).at(i).get('ar')?.value;
    const karmaVissza = (this.artifactsForm.get('artifacts') as FormArray).at(i).get('karma')?.value;
    const szint = (this.artifactsForm.get('artifacts') as FormArray).at(i).get('szint')?.value;
    this.resServ.payToke(-arVissza*szint);
    this.resServ.payKarma(-karmaVissza*szint);
    (this.artifactsForm.get('artifacts') as FormArray).removeAt(i);
  }

  getFcArr(i:number, fcName:string) {
    const artifact = ((this.artifactsForm.get('artifacts') as FormArray).at(i) as FormGroup).get(fcName);
    return artifact;
  }

}
