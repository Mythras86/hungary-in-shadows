import { Component, OnInit } from '@angular/core';
import { npcUtil } from './npc-utility';
import { Subject } from 'rxjs';
import { ModalService } from '../elements/modals/modal.service';

@Component({
  selector: 'app-npcs',
  templateUrl: './npcs.component.html',
  styleUrls: ['./npcs.component.scss']
})
export class NpcsComponent implements OnInit {

  constructor(
    public modalS: ModalService,
  ) {}

  listMode: boolean = true;
  npcFilter: string = '';

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  loadData(modalData: string): void {
    this.listMode = false;
    this.npcFilter = modalData;
  }

  onClose() {
    this.closeEvent.complete();
  }

  getFilteredNpcs(f: string): Array<any> {
    const filteredNpcs = npcUtil.filter(x=>x.frakcio == f);
    return filteredNpcs;
  }

  getOneNpc(): Array<any> {
    const filteredNpcs = npcUtil.filter(x=>x.nev == this.npcFilter);
    return filteredNpcs;
  }

  getFrakcio(): Array<any> {
    const frakcio = npcUtil.map(x=>x.frakcio);
    const frakcioUnique = [...new Set(frakcio.map(x=> x))];
    return frakcioUnique;
  }

  showOneNpc(npcNev: string): void {
    this.modalS.openModal(NpcsComponent, npcNev).subscribe();
  }

  ngOnInit(): void {
  }
}
