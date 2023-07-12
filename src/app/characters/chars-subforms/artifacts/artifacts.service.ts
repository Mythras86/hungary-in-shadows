import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';

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
          megjegyzes: e.megjegyzes,
        }))
    });
    return artifacts;
  }

  addArtifact(addId: string, addNev: string, addCsoport: string, addMSzint: number, addAr: number, addKarma: number, addMegj: string): void {
    if (addNev == null) {
      return;
    }
    const artifact = this.fb.group({
      _id: [addId, Validators.required],
      nev: [addNev, Validators.required],
      csoport: [addCsoport, Validators.required],
      maxSzint: [addMSzint, Validators.required],
      szint: [1, Validators.required],
      ar: [addAr, Validators.required],
      karma: [addKarma, Validators.required],
      megjegyzes: [addMegj, Validators.required],
    });
    this.resServ.fizetesTokebol(addAr);
    this.resServ.fizetesKarmabol(addKarma);
    (this.artifactsForm.get('artifacts') as FormArray).push(artifact);
  }

  removeArtifact(i:number): void {
    const arVissza = (this.artifactsForm.get('artifacts') as FormArray).at(i).get('ar')?.value;
    const karmaVissza = (this.artifactsForm.get('artifacts') as FormArray).at(i).get('karma')?.value;
    const szint = (this.artifactsForm.get('artifacts') as FormArray).at(i).get('szint')?.value;
    this.resServ.fizetesTokebol(-arVissza*szint);
    this.resServ.fizetesKarmabol(-karmaVissza*szint);
    (this.artifactsForm.get('artifacts') as FormArray).removeAt(i);
  }

  getFcArr(i:number, fcName:string) {
    const artifact = ((this.artifactsForm.get('artifacts') as FormArray).at(i) as FormGroup).get(fcName);
    return artifact;
  }

}
