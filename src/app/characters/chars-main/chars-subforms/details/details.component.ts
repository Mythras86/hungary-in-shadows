import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { detailsUtil, genekUtil, nemekUtil, nyelvekUtil} from './details-utility';
import { DetailsService } from './details.service';
import { InputModalService } from 'src/app/elements/modals/input-modal/input-modal.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class CharDetailsComponent implements OnInit {

  constructor(
    public detailsServ: DetailsService,
    public inputModalServ: InputModalService,
  ) {}

  getDetailsUtil():any {
    return detailsUtil;
  }

  getValue(fcName: string) {
    return this.detailsServ.detailsForm.get(fcName)?.value;
  }

  getForm(): FormGroup {
    return this.detailsServ.detailsForm;
  }

  getFcPath(fcName: string):any {
    let fc = this.detailsServ.detailsForm.get(fcName);
    return fc;
  }

  getDefault(fcName: string):any {
    const valasztottFaj: string = this.detailsServ.detailsForm.get('genek')?.value
    if (valasztottFaj !== '') {
      if (fcName == 'eletkor') {
        const defAge = genekUtil.filter(x=>x.genek = valasztottFaj).map(x=>x.defAge)[0];
        console.log(defAge)
        return defAge;
      }
      if (fcName == 'magassag') {
        const defHeight = genekUtil.filter(x=>x.genek = valasztottFaj).map(x=>x.defHeight)[0];
        return defHeight;
      }
      if (fcName == 'testsuly') {
        const defWieght = genekUtil.filter(x=>x.genek = valasztottFaj).map(x=>x.defWieght)[0];
        return defWieght;
      }
      if (fcName == 'kepessegek') {
        const kepessegek = genekUtil.filter(x=>x.genek = valasztottFaj).map(x=>x.defKepessegek)[0];
        return kepessegek;
      }
    }
    return this.detailsServ.detailsForm.get(fcName)?.value;
  }

  getList(listaNev:string):Array<any> {
    if (listaNev == 'genekLista') {
      const genekLista = genekUtil.map(x => x.dns);
      return genekLista;
    }
    if (listaNev == 'nemLista') {
      return nemekUtil.map(x => x);
    }
    if (listaNev == 'anyanyelvLista') {
      return nyelvekUtil.map(x => x);
    }
    return [];
  }

  hideButton(fcName: string):boolean {
    if (fcName !== 'genek'
    && fcName !== 'nem'
    && (this.getDefault('nem') == ''
    || this.getDefault('genek') == '') ) {
      return false
    }
    return true;
  }

  ngOnInit(): void {
    this.detailsServ.createDetails();
  }

}
