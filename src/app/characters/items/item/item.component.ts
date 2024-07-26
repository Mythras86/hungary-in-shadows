import { Component, Input, OnInit } from '@angular/core';
import { ItemsModel } from '../items.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item!: ItemsModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
