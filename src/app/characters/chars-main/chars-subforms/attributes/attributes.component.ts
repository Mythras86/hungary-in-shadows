import { Component, OnInit } from '@angular/core';
import { AttributesService } from './attributes.service';
import { attributesUtil } from './attributes-utility';
import { ResourcesService } from '../resources/resources.service';
import { LevelcontrolService } from 'src/app/elements/modals/levelcontrol/levelcontrol.service';
import { DetailsService } from '../details/details.service';
import { dnsUtil } from '../details/details-utility';
import { CharsMainService } from '../../chars-main.service';

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
    public charServ: CharsMainService
  ) {}

  getCsoport (): Array<any> {
    const csoport = [...new Set(attributesUtil.map(x => x.csoport))];
    return csoport;
  }

  getAttrsByCsoport(filter: string):Array<any> {
    const filteredAttrs = attributesUtil.filter(x => x.csoport == filter).map(x => x);
    return filteredAttrs;
  }

  getFcPath(fcName: string):any {
    return this.attrServ.attributesForm.get(fcName);
  }

  getAttrPointsPath(): any {
    return this.resServ.resourcesForm.get('attrToSpend');
  }

  getValue(fcName: string):number {
    return this.attrServ.attributesForm.get(fcName)?.value;
  }

  getAttrMax(fcName: string, attrMax: number):number {
    const valasztottDns = this.detailsServ.detailsForm.get('dns')?.value;
    const dnsChange = dnsUtil.filter(x => x.dns == valasztottDns).map(x => x[fcName])[0];
    if (dnsChange !== undefined) {
      return dnsChange;
    }
    return attrMax;
  }

  ngOnInit(): void {
    this.attrServ.createAttributes();
  }
}
