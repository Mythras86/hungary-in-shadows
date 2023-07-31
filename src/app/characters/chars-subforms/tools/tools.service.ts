import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(
    private fb: FormBuilder,
    private resServ: ResourcesService,
  ) { }

  toolsForm!: FormGroup;

  createTools(): FormGroup {
    const tools = {
      tools: this.fb.array([]),
    };
    return this.toolsForm = this.fb.group(tools);
  }

  setTools(dataset: any[]): FormArray {
    const tools = (this.toolsForm.get('tools') as FormArray);
    dataset.forEach(e => {
      tools.push(
        this.fb.group({
          _id: e._id,
          nev: e.nev,
          csoport: e.csoport,
          maxSzint: e.maxSzint,
          szint: e.szint,
          suly: e.suly,
          ar: e.ar,
          elhelyezes: e.elhelyezes,
          megjegyzes: e.megjegyzes,
        }))
    });
    return tools;
  }

  addTool(addId: string, addNev: string, addCsoport: string, addMSzint: number, addSuly: number, addAr: number, addMegj: string): void {
    if (addNev == null) {
      return;
    }
    const tool = this.fb.group({
      _id: [addId, Validators.required],
      nev: [addNev, Validators.required],
      csoport: [addCsoport, Validators.required],
      maxSzint: [addMSzint, Validators.required],
      szint: [1, Validators.required],
      suly: [addSuly, Validators.required],
      ar: [addAr, Validators.required],
      elhelyezes: ['raktár', Validators.required],
      megjegyzes: [addMegj, Validators.required],
    });
    this.resServ.fizetesTokebol(addAr);
    (this.toolsForm.get('tools') as FormArray).push(tool);
  }

  removeTool(i:number): void {
    const arVissza = (this.toolsForm.get('tools') as FormArray).at(i).get('ar')?.value;
    const szint = (this.toolsForm.get('tools') as FormArray).at(i).get('szint')?.value;
    this.resServ.fizetesTokebol(-arVissza*szint);
    (this.toolsForm.get('tools') as FormArray).removeAt(i);
  }

  getFcArr(i:number, fcName:string) {
    const tool = ((this.toolsForm.get('tools') as FormArray).at(i) as FormGroup).get(fcName);
    return tool;
  }

}
