import { Injectable } from '@angular/core';
import { ModalService } from '../modal.service';
import { SelectSkillsComponent } from './select-skills.component';

@Injectable({
  providedIn: 'root'
})
export class SelectSkillsService {

  constructor(
    private modalServ: ModalService
  ) { }

  openModal() {
    this.modalServ.openModal(SelectSkillsComponent, '').subscribe(
      w => this.updateData(w)
    );
  }

  updateData(w: string) {
    return w;
  }

}
