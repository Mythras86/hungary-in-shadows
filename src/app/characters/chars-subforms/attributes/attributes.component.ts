import { Component, OnInit } from '@angular/core';
import { AttributesService } from './attributes.service';
import { attributesUtil } from './attributes-utility';
import { ResourcesService } from '../resources/resources.service';
import { LevelcontrolService } from 'src/app/elements/modals/levelcontrol/levelcontrol.service';
import { DetailsService } from '../details/details.service';
import { dnsUtil } from '../details/details-utility';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {

  constructor(
    public attrServ: AttributesService,
    public resServ: ResourcesService,
    public lvlContServ: LevelcontrolService,
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
    const karma = this.resServ.getFc('elkolthetoKarma').value;
    const fcvalue = this.attrServ.getFc(fcName).value;
    if (
      karma >= 3
      && 6 > fcvalue
      ) {
        return true;
      }
      return false;
  }

  ngOnInit(): void {
    this.attrServ.createAttributes();
  }
}
