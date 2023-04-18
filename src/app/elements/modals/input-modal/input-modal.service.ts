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

  sendData(
    fcName:string,
    tipus:string,
    fejlec:string,
    megjegyzes:string,
    ertek: any,
    lista: any,
    egyseg: string,
    lepes: number
    ) {
    this.modalServ.openModal(InputModalComponent, {
      tipus: tipus,
      fejlec: fejlec,
      megjegyzes: megjegyzes,
      ertek: ertek,
      lista: lista,
      egyseg: egyseg,
      lepes: lepes
    }).subscribe(
      w => this.updateData(fcName, w)
    );
  }

  updateData(fcPath:any, value:any) {
    return fcPath.patchValue(value);
  }

}
