import { Component, OnInit } from '@angular/core';
import { AttributesService } from './attributes.service';
import { AttrInterface, attributesUtil } from './attributes-utility';
import { ResourcesService } from '../resources/resources.service';
import { DetailsService } from '../details/details.service';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { LevelcontrolComponent } from 'src/app/elements/levelcontrol/levelcontrol.component';
import { AttributesModel } from './attributes.model';

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

  attributes: Array<any> = [];
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
    karmaKtsg: 5,
    esszKtsg: 0,
    celErtek: this.s.getFc(fcName).value,
    egyseg: attr.egyseg,
    minErtek: this.s.getFc(fcName).value,
    maxErtek: attr.max,
    }).subscribe(
      w => this.lvlUp(w, fcName)
    );
  }

  lvlUp(valtozas: number, fcName: string): void {
    const form = this.s.attributesForm.get(fcName);
    // kifizetés
    this.resS.payKarma(valtozas*5);
    // értékszerzés
    form?.patchValue(form.value+valtozas);
  }

  updKezdemenyezes(): void {
    this.s.attributesForm.get('kezdemenyezes')?.setValue(1);
  }

  updReakcio(): number {
    const gyo = this.s.getTulErtek('fizGyo');
    const int = this.s.getTulErtek('asztGyo');
    const reakcio = Math.floor((gyo+int)/2);
    return reakcio;
  }

  ngOnInit(): void {
    this.s.attributesForm.get('fizGyo')?.valueChanges.subscribe(
      ()=> this.s.attributesForm.get('reakcio')?.setValue(this.updReakcio())
    );
    this.s.attributesForm.get('asztGyo')?.valueChanges.subscribe(
      ()=> this.s.attributesForm.get('reakcio')?.setValue(this.updReakcio())
    );
  }
}
