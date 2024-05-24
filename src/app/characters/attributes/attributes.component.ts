import { Component, OnInit } from '@angular/core';
import { AttributesService } from './attributes.service';
import { attributesUtil } from './attributes-utility';
import { ResourcesService } from '../resources/resources.service';
import { DetailsService } from '../details/details.service';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';
import { LevelcontrolService } from 'src/app/elements/Inputs/levelcontrol/levelcontrol.service';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {

  constructor(
    public s: AttributesService,
    public resS: ResourcesService,
    public detailsS: DetailsService,
    public select: ItemSelectService,
    public lvlCS: LevelcontrolService
  ) {}

  getCsoport (): Array<any> {
    const csoport = [...new Set(attributesUtil.map(x => x.csoport))];
    return csoport;
  }

  getAttrsByCsoport(filter: string):Array<any> {
    const filteredAttrs = attributesUtil.filter(x => x.csoport == filter).map(x => x);
    return filteredAttrs;
  }

  checkEssence(elem: string) {
    const magia = this.s.getTulErtek('magia');
    const chi = this.s.getTulErtek('chi');
    const esszencia = this.s.getTulErtek('esszencia');
    if (elem == 'magia' || 'chi') {
      return esszencia-chi-magia;
    }
    if (elem == 'cyberCapacity') {
      return esszencia;
    }
    return 0;
  }

  ngOnInit(): void {
  }
}
