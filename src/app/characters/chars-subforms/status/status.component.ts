import { Component, OnInit } from '@angular/core';
import { StatusService } from './status.service';
import { AttributesService } from '../attributes/attributes.service';
import { DetailsService } from '../details/details.service';
import { ArmorsService } from '../armors/armors.service';
import { ResourcesService } from '../resources/resources.service';
import { LevelcontrolService } from 'src/app/elements/modals/levelcontrol/levelcontrol.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(
    public statServ: StatusService,
    public attrServ: AttributesService,
    public detailsServ: DetailsService,
    public armorsServ: ArmorsService,
    public resServ: ResourcesService,
    public lvlContServ: LevelcontrolService,
  ) {}

  toggleKockaMColor(fcName: string, i:number):string {
    if(i == 4 && this.getFcValue(fcName) == i) {
      return 'ngrn'
    }
    if(i == 3 && this.getFcValue(fcName) == i) {
      return 'nbl'
    }
    if(i == 2 && this.getFcValue(fcName) == i) {
      return 'nyllw'
    }
    if(i == 1 && this.getFcValue(fcName) == i) {
      return 'nrng'
    }
    if(i == 0 && this.getFcValue(fcName) == i) {
      return 'nrd'
    }
    return 'grayCell';
  }

  sendStatus(fcName: string, i: number) {
    const sendStatus = this.statServ.statusForm.get(fcName)?.patchValue(i);
    return sendStatus;
  }

  getFcValue(fcName: string): number {
    return this.statServ.statusForm.get(fcName)?.value;
  }

  toggleColor(value: number):string {
    if(value < 0) {
      return 'nrd';
    }
    if(value == 0) {
      return 'nyllw';
    }
    return 'ngrn';
  }

  getModosito(i: number): number {
    const terheles = Math.floor(11-i-(11-i)/2-1);
    if (terheles < 0) {
      return 0;
    }
    return -terheles;
  }

  getMaxMod(astral: string, body: string): number {
    const asztral = this.getFcValue(astral);
    const fizikum = this.getFcValue(body);
    if (asztral < fizikum) {
      return asztral;
    }
    return fizikum;
  }

  getPusztakez():string {
    const ero = this.attrServ.getTulErtek('fizEro');
    const gyo = this.attrServ.getTulErtek('fizGyo');
    const ugy = this.attrServ.getTulErtek('fizUgy');
    const tamEro = Math.round((ero + ugy + this.getMeretkateg())/2);
    const sebz = Math.round(Math.pow((ero * gyo * this.getMeretkateg()), 0.33));
    return '1AP / '+tamEro +'('+sebz+' K)';
  }

  getMeretkateg():number {
    return this.detailsServ.getFc('magassag')?.value/100;
  }

  ngOnInit(): void {
    this.statServ.createStatus();
  }

}
