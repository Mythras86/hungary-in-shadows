import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(
    public s: ItemsService,
    public select: ItemSelectService,
  ){}

  public get items(): FormArray | null | any {
    if(!this.s.itemsForm) {
      return null;
    }
    return this.s.itemsForm.controls['items'] as FormArray;
  }

  ngOnInit(): void {
  }
}
