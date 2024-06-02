import { Component, OnInit } from '@angular/core';
import { npcUtil } from './npc-utility';
import { Subject, filter, map } from 'rxjs';
import { ModalService } from '../elements/modals/modal.service';
import { NpcsService } from './npcs.service';

@Component({
  selector: 'app-npcs',
  templateUrl: './npcs.component.html',
  styleUrls: ['./npcs.component.scss']
})
export class NpcsComponent implements OnInit {

  constructor(
    public s: NpcsService,
  ) {}

  mode: string = 'list';
  npcFilter: string = '';

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  loadData(modalData: string): void {
    this.mode = 'one';
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

  ngOnInit(): void {
  }
}
