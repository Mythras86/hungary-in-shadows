import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ResourcesService } from '../resources/resources.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private fb: FormBuilder,
    private resServ: ResourcesService,
  ) { }

  itemsForm!: FormGroup;

  createItems(): FormGroup {
    const items = {
      items: this.fb.array([]),
    }
    return this.itemsForm = this.fb.group(items);
  }

  addItem(): void {
    // if (nev == null) {
    //   return;
    // }
    const item = this.fb.group({
      //item attributes
    });
    // pay the cost
    (this.itemsForm.get('items') as FormArray).push(item);
  }

  setItems(dataset: any[]): FormArray<any> {
    const items = (this.itemsForm.get('items') as FormArray);
    dataset.forEach(e => {
      items.push(
        this.fb.group({
      //item attributes
    }))
    });
    return items;
  }

  updateItems(w: any): void {
    this.createItems();
    this.itemsForm.addControl('itemsForm', new FormGroup({}));
    (this.itemsForm as FormGroup).addControl('items', this.setItems(w.items));
  }

  removeItem(i:number): void {
    // retrieve cost
    (this.itemsForm.get('items') as FormArray).removeAt(i);
  }

  getFc(i:number, fcName:string) {
    const itemPath = ((this.itemsForm.get('items') as FormArray).at(i) as FormGroup).get(fcName);
    return itemPath;
  }

}
