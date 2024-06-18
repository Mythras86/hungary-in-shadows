import { Component, OnInit } from '@angular/core';
import { AttributesService } from './attributes.service';
import { AttrInterface, attributesUtil } from './attributes-utility';
import { ResourcesService } from '../resources/resources.service';
import { DetailsService } from '../details/details.service';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { LevelcontrolComponent } from 'src/app/elements/Inputs/levelcontrol/levelcontrol.component';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent implements OnInit {

  constructor(
    public s: AttributesService,
    public resS: ResourcesService,
    public detailsS: DetailsService,
    public select: ItemSelectService,
    public modalS: ModalService,
  ) {
    this.csoportok = this.getCsoport();
    this.attributes = attributesUtil;
  }

  attributes: Array<AttrInterface> = [];
  csoportok: Array<string> = [];

  getCsoport (): Array<any> {
    const csoport = [...new Set(attributesUtil.map(x => x.csoport))];
    return csoport;
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

  attrLvlUp(fcName: string):void {
    const attr: AttrInterface = attributesUtil.filter(x=>x.fcName == fcName)[0];
    this.modalS.openModal(LevelcontrolComponent, {
    fejlec: attr.nev,
    megjegyzes: attr.megjegyzes,
    lepes: attr.lepes,
    valto: 1,
    tokeKtsg: 0,
    karmaKtsg: 3,
    esszKtsg: 0,
    celControl: this.s.getFc(fcName),
    egyseg: attr.egyseg,
    minErtek: this.s.getFc(fcName).value,
    maxErtek: 6,
    }).subscribe(
      w => this.updateData(w, fcName)
    );
  }

  updateData(valtozas: number, fcName: string): any[] {
    return [
      // kifizetés
      this.resS.payKarma(valtozas*3),
      // értékszerzés
      this.s.attributesForm.get(fcName)?.patchValue(++valtozas)
    ];
  }


  ngOnInit(): void {
  }
}
