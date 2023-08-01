import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';
import { ToolsModel } from './tools.model';

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

  addTool(t: ToolsModel): void {
    if (t.nev == null) {
      return;
    }
    const tool = this.fb.group({
      _id: [t._id, Validators.required],
      nev: [t.nev, Validators.required],
      csoport: [t.csoport, Validators.required],
      maxSzint: [t.maxSzint, Validators.required],
      szint: [1, Validators.required],
      suly: [t.suly, Validators.required],
      ar: [t.ar, Validators.required],
      elhelyezes: ['raktár', Validators.required],
      megjegyzes: [t.megjegyzes, Validators.required],
    });
    this.resServ.fizetesTokebol(t.ar);
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
