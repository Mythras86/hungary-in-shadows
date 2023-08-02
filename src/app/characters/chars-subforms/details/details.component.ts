import { Component, OnInit } from '@angular/core';
import { detailsUtil, dnsUtil, nemekUtil, nyelvekUtil} from './details-utility';
import { DetailsService } from './details.service';
import { InputModalService } from 'src/app/elements/modals/input-modal/input-modal.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    public detailsServ: DetailsService,
    public inputModServ: InputModalService,
  ) {}

  getDetailsUtil():any {
    return detailsUtil;
  }

  getDefault(fcName: string):any {
    const valasztottFaj: string = this.detailsServ.detailsForm.get('dns')?.value;
    if (valasztottFaj !== '') {
      if (fcName == 'eletkor') {
        const defAge = dnsUtil.filter(x=>x.dns == valasztottFaj).map(x=>x.defAge)[0];
        return defAge;
      }
      if (fcName == 'magassag') {
        const defHeight = dnsUtil.filter(x=>x.dns == valasztottFaj).map(x=>x.defHeight)[0];
        return defHeight;
      }
      if (fcName == 'testsuly') {
        const defWieght = dnsUtil.filter(x=>x.dns == valasztottFaj).map(x=>x.defWieght)[0];
        return defWieght;
      }
      if (fcName == 'kepessegek') {
        const kepessegek: Array<any> = dnsUtil.filter(x=>x.dns == valasztottFaj).map(x=>x.defKepessegek)[0];
        return kepessegek;
      }
    }
    return null;
  }

  getList(listaNev:string):Array<any> {
    if (listaNev == 'dns') {
      const genekLista = dnsUtil.map(x => x.dns);
      return genekLista;
    }
    if (listaNev == 'nem') {
      return nemekUtil.map(x => x);
    }
    if (listaNev == 'anyanyelv') {
      return nyelvekUtil.map(x => x);
    }
    return [];
  }

  ngOnInit(): void {
    this.detailsServ.createDetails();
  }

}
