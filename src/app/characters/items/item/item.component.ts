import { Component, Input, OnInit } from '@angular/core';
import { ItemsModel } from '../items.model';
import { attributesUtil } from '../../attributes/attributes-utility';
import { HideService } from 'src/app/elements/hide-content/hide-content.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item!:ItemsModel;
  @Input() i:number = 0;

  tulNev: string = '';

  constructor(
    public hide: HideService,
  ) {}

  getTulNev(fcName: string): string {
    if (!this.item.tulajdonsagModosito) {
      return '';
    }
    if (fcName == 'pancel') {
      return 'Páncél';
    }
    if (fcName == 'tamadas') {
      return 'Tamadóerő';
    }
    const tul = attributesUtil.filter(x=>x.fcName == fcName)[0];
    return tul.nev;

    // const tul = this.item.tulajdonsagModosito!.map(x => x);
    // tul.forEach(x=>{
    //   if (x.nev == 'pancel') {
    //     return this.tulNev = 'Páncél';
    //   }
    //   if (x.nev == 'tamadas') {
    //     return this.tulNev = 'Támadás';
    //   }
    //   const tulnev = attributesUtil.filter(y=>y.fcName == x.nev)[0];
    //   return  this.tulNev = tulnev.nev;
    // });
  }

  ngOnInit(): void {
  }

}
