import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';
import { ItemsService } from './items.service';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { SelectItemComponent } from './select-item/select-item.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(
    public s: ItemsService,
    public select: ItemSelectService,
    private modalS: ModalService,
  ){}

  public get armors(): FormArray | null | any {
    if(!this.s.itemsForm) {
      return null;
    }
    return this.s.itemsForm.controls['armors'] as FormArray;
  }

  public get armorAddons(): FormArray | null | any {
    if(!this.s.itemsForm) {
      return null;
    }
    return this.s.itemsForm.controls['armorAddons'] as FormArray;
  }

  newItem(){
    //const ownedItemsId: Array<string> = Object.values(this.items.controls).map((x:any) => x.value).map(x => x.id);
    this.modalS.openModal(SelectItemComponent, '').subscribe(
      w => this.s.addItem(w)
    );
  }

  ngOnInit(): void {
    this.armors.valueChanges.subscribe(
      ()=> console.log(this.armors)
    );
  }
}
