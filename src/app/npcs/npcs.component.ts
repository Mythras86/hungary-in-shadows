import { Component, OnInit } from '@angular/core';
import { npcUtil } from './npc-utility';
import { ModalService } from '../elements/modals/modal.service';

@Component({
  selector: 'app-npcs',
  templateUrl: './npcs.component.html',
  styleUrls: ['./npcs.component.scss']
})
export class NpcsComponent implements OnInit {

  constructor(
    public modalS: ModalService,
  ) {
    this.frakciok = this.getFrakciok();
  }

  listMode: boolean = true;
  npcFilter: string = '';
  frakciok: Array<string> = []

  getFilteredNpcs(f: string): Array<any> {
    const filteredNpcs = npcUtil.filter(x=>x.frakcio == f);
    return filteredNpcs;
  }

  getOneNpc(): Array<any> {
    const filteredNpcs = npcUtil.filter(x=>x.nev == this.npcFilter);
    return filteredNpcs;
  }

  getFrakciok(): Array<any> {
    const frakcio = npcUtil.map(x=>x.frakcio);
    const frakcioUnique = [...new Set(frakcio.map(x=> x))];
    return frakcioUnique;
  }

  ngOnInit(): void {
  }
}
