import { Injectable, Input } from '@angular/core';
import { ModalService } from '../../modals/modal.service';
import { InpDetailsComponent } from './inp-details.component';
import { DetailsService } from 'src/app/characters/details/details.service';

@Injectable({
  providedIn: 'root'
})
export class InpDetailsService {

  constructor(
    private modalServ: ModalService,
    private detailsS: DetailsService
  ) { }

  buttonAction(
    mode: string,
    nev: string,
    tipus: string,
    egyseg: string,
    fcName: string,
    megjegyzes: string,
    ertek: any,
    lista: any,
    ) {
    this.modalServ.openModal(InpDetailsComponent, {
      mode: mode,
      nev: nev,
      tipus: tipus,
      egyseg: egyseg,
      fcName: fcName,
      megjegyzes: megjegyzes,
      ertek: ertek,
      lista: lista,
    }).subscribe(
      w => this.updateData(w[0], w[1])
      );
  }

  updateData(fcName: string, value:any) {
    return this.detailsS.detailsForm.get(fcName)?.patchValue(value);
  }

}
