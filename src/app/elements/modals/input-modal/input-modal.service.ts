import { Injectable } from '@angular/core';
import { ModalService } from '../modal.service';
import { InputModalComponent } from './input-modal.component';

@Injectable({
  providedIn: 'root'
})
export class InputModalService {

  constructor(
    private modalServ: ModalService
  ) { }

  buttonAction(
    fcPath: any,
    fcName: string,
    tipus: string,
    fejlec: string,
    megjegyzes:any,
    ertek: any,
    lista: any,
    egyseg: string,
    ) {
    this.modalServ.openModal(InputModalComponent, {
      fcPath: fcPath,
      fcName: fcName,
      tipus: tipus,
      fejlec: fejlec,
      megjegyzes: megjegyzes,
      ertek: ertek,
      lista: lista,
      egyseg: egyseg,

    }).subscribe(
      w => this.updateData(fcPath, w)
    );
  }

  updateData(fcPath:any, value:any) {
    return fcPath.patchValue(value);
  }

}
