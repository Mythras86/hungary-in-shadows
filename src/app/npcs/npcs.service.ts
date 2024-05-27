import { Injectable } from '@angular/core';
import { NpcsComponent } from './npcs.component';
import { ModalService } from '../elements/modals/modal.service';
import { npcUtil } from './npc-utility';

@Injectable({
  providedIn: 'root'
})
export class NpcsService {

  constructor(
    private modalS: ModalService,
  ) { }

  buttonAction(npcNev: string): void {
    this.modalS.openModal(NpcsComponent, npcNev).subscribe();
  }

}
