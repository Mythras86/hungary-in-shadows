import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ItemsModel } from '../items.model';
import { SpiritsInterface, SpiritsUtil } from './spirit-utility';

@Component({
  selector: 'app-spirit',
  templateUrl: './spirit.component.html',
  styleUrl: './spirit.component.scss'
})
export class SpiritComponent implements OnInit {

  @Input() item!:ItemsModel;

  FizEro: number = 0;
  FizGyo: number = 0;
  FizUgy: number = 0;
  FizAll: number = 0;
  AsztEro: number = 0;
  AsztGyo: number = 0;
  AsztUgy: number = 0;
  AsztAll: number = 0;
  kepessegek: string = '';
  akciopont: number = 0;

  getSpirit() {
    const spirit: any = SpiritsUtil.filter(x=> x.nev == this.item.nev)[0];
    this.FizEro = spirit.FizEro;
    this.FizGyo = spirit.FizGyo;
    this.FizUgy = spirit.FizUgy;
    this.FizAll = spirit.FizAll;
    this.AsztEro = spirit.AsztEro;
    this.AsztGyo = spirit.AsztGyo;
    this.AsztUgy = spirit.AsztUgy;
    this.AsztAll = spirit.AsztAll;
    this.kepessegek = spirit.kepessegek;
  }

  getAkcio(): void {
    const akciopont = Math.floor((this.FizGyo+this.item.szint!+this.AsztGyo+this.item.szint!)/2);
    this.akciopont = akciopont;
  }

  ngOnInit(): void {
    this.getSpirit();
    this.getAkcio();
  }
}
