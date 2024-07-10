import { Component, OnInit } from '@angular/core';
import { DetailsService } from './details.service';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';
import { detailsInterface, detailsUtil, dnsUtil, nemekUtil, nyelvekUtil } from './details-utility';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(
    public s: DetailsService,
    public select: ItemSelectService,
    private modalS: ModalService,
  ) {
    this.details = detailsUtil;
  }

  details: Array<detailsInterface> = [];

  getDefault(fcName: string):any {
    const valasztottFaj: string = this.s.detailsForm.get('dns')?.value;
    if (valasztottFaj !== '') {
      if (fcName == 'eletkor') {
        const defAge: string = dnsUtil.filter(x=>x.dns == valasztottFaj).map(x=>x.defAge)[0];
        return defAge;
      }
      if (fcName == 'magassag') {
        const defHeight: string = dnsUtil.filter(x=>x.dns == valasztottFaj).map(x=>x.defHeight)[0];
        return defHeight;
      }
      if (fcName == 'testsuly') {
        const defWieght: string = dnsUtil.filter(x=>x.dns == valasztottFaj).map(x=>x.defWieght)[0];
        return defWieght;
      }
      if (fcName == 'kepessegek') {
        const kepessegek: Array<any> = dnsUtil.filter(x=>x.dns == valasztottFaj).map(x=>x.defKepessegek)[0];
        return kepessegek;
      }
    }
    return;
  }

  getList(fcName:string):Array<any> {
    if (fcName == 'dns') {
      const genekLista = dnsUtil.map(x => x.dns);
      return genekLista;
    }
    if (fcName == 'nem') {
      return nemekUtil.map(x => x);
    }
    if (fcName == 'anyanyelv') {
      return nyelvekUtil.map(x => x);
    }
    return [];
  }

  fillWithDummy(): void {
    this.s.getFc('teljesnev').patchValue('Szikla Szilárd');
    this.s.getFc('becenev').patchValue('Bazalt');
    this.s.getFc('alnev').patchValue('Kavics');
    this.s.getFc('testalkat').patchValue('Mackós');
    this.s.getFc('hajstilus').patchValue('Kopasz');
    this.s.getFc('nem').patchValue('Férfi');
    this.s.getFc('dns').patchValue('Tünde');
    this.s.getFc('anyanyelv').patchValue('Magyar');
    this.s.getFc('eletkor').patchValue(35);
    this.s.getFc('magassag').patchValue(180);
    this.s.getFc('testsuly').patchValue(100);
    this.s.getFc('felelem').patchValue('van');
    this.s.getFc('osztonzo').patchValue('van');
    this.s.getFc('gyulolet').patchValue('van');
    this.s.getFc('kedvenc').patchValue('van');
    this.s.getFc('irtozat').patchValue('van');
    this.s.getFc('vonzalom').patchValue('van');
    this.s.getFc('megjelenes').patchValue('van');
  }

  setDetail(fcName: string): void {
    const detail: detailsInterface = detailsUtil.filter(x=>x.fcName == fcName)[0];
    this.modalS.openModal(DetailComponent, {
      editMode: true,
      nev: detail.nev,
      tipus: detail.tipus,
      egyseg: detail.egyseg,
      fcName: detail.fcName,
      megjegyzes: detail.megjegyzes + (this.getDefault(fcName) == undefined ? '' : ' ' + this.getDefault(fcName)),
      ertek: this.s.getFc(fcName)?.value,
      lista: this.getList(fcName),
    }).subscribe(
      w => this.s.detailsForm.get(fcName)?.patchValue(w)
    );
  }

  ngOnInit(): void {
  }

}
