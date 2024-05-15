import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
}
