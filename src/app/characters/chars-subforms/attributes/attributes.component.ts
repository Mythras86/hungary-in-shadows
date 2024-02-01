import { Component, OnInit } from '@angular/core';
import { AttributesService } from './attributes.service';
import { attributesUtil } from './attributes-utility';
import { ResourcesService } from '../resources/resources.service';
import { DetailsService } from '../details/details.service';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {

  constructor(
    public attrServ: AttributesService,
    public resServ: ResourcesService,
    public detailsServ: DetailsService,
  ) {}

  getCsoport (): Array<any> {
    const csoport = [...new Set(attributesUtil.map(x => x.csoport))];
    return csoport;
  }

  getAttrsByCsoport(filter: string):Array<any> {
    const filteredAttrs = attributesUtil.filter(x => x.csoport == filter).map(x => x);
    return filteredAttrs;
  }

  buttonStatus(fcName: string, attrMax: number):boolean {
    const karma = this.resServ.getFc('szabadKarma').value;
    const fcvalue = this.attrServ.getFc(fcName).value;
    if (
      karma >= 3
      && 6 > fcvalue
      ) {
        return true;
      }
      return false;
  }

  getMagia() {
    const essz = this.attrServ.getFc('esszencia')?.value;
    const magia = this.attrServ.getFc('magia')?.value;
    if (magia>essz) {
      return Math.floor(essz);
    }
    return magia;
  }

  ngOnInit(): void {
  }
}
