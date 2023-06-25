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

  getAttrMax(fcName: string, attrMax: number):number {
    const valasztottDns = this.detailsServ.detailsForm.get('dns')?.value;
    const dnsChange = dnsUtil.filter(x => x.dns == valasztottDns).map(x => x[fcName])[0];
    if (dnsChange !== undefined) {
      return dnsChange;
    }
    return attrMax;
  }

  getCsoportErtek(csoport: string) {
    if(csoport == 'Fizikum') {
      return this.attrServ.getFizikum();
    }
    if(csoport == 'Asztrál') {
      return this.attrServ.getAsztral();
    }
    return null;
  }

  buttonStatus(fcName: string, attrMax: number):boolean {
    const karma = this.resServ.getFc('elkolthetoKarma').value;
    const attrmax = this.getAttrMax(fcName, attrMax);
    const fcvalue = this.attrServ.getFc(fcName).value;
    if (
      karma >= 3
      && attrmax > fcvalue
      ) {
        return true;
      }
      return false;
  }

  ngOnInit(): void {
    this.attrServ.createAttributes();
  }
}
