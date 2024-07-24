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

  tokeKtsg: number = 0;
  karmaKtsg: number = 0;
  esszenciaKtsg: number = 0;
  tokeKtsgPerSzint: number = 0;
  karmaKtsgPerSzint: number = 0;
  esszenciaKtsgPerSzint: number = 0;
  tokeKtsgSzorzo: number = 0;
  karmaKtsgSzorzo: number = 0;
  esszenciaKtsgSzorzo: number = 0;

  getValue(fieldValue: any): number {
    if (fieldValue != undefined) {
      return fieldValue;
    }
    return 0;
  }

  ngOnInit(): void {
    this.tokeKtsg = this.getValue(this.item.tokeKtsg);
    this.karmaKtsg = this.getValue(this.item.karmaKtsg);
    this.esszenciaKtsg = this.getValue(this.item.esszenciaKtsg);
    this.tokeKtsgPerSzint = this.getValue(this.item.tokeKtsgPerSzint);
    this.karmaKtsgPerSzint = this.getValue(this.item.karmaKtsgPerSzint);
    this.esszenciaKtsgPerSzint = this.getValue(this.item.esszenciaKtsgPerSzint);
    this.tokeKtsgSzorzo = this.getValue(this.item.tokeKtsgSzorzo);
    this.karmaKtsgSzorzo = this.getValue(this.item.karmaKtsgSzorzo);
    this.esszenciaKtsgSzorzo = this.getValue(this.item.esszenciaKtsgSzorzo);
  }

}
