import { Component, OnInit } from '@angular/core';
import { StatusService } from './status.service';
import { AttributesService } from '../attributes/attributes.service';
import { DetailsService } from '../details/details.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(
    private statServ: StatusService,
    public attrServ: AttributesService,
    public detailsServ: DetailsService,
  ) {}

  hideMe: boolean = true;
  akcio: number = 3;
  sebzes: string = 'K';

  showMe() {
    this.hideMe = false;
  }

  sebzesMod(tipus: string):number {
    const sebzes = this.attrServ.getTulErtek("fizEro")-2;
    if (tipus == 'K') {
      return 0;
    }
    if (sebzes == -1) {
      return 0;
    }
    if (sebzes == 0) {
      return -1;
    }
    return -2;
  }

  sendStatus(fcName: string, i: number) {
    const sendStatus = this.statServ.statusForm.get(fcName)?.patchValue(i);
    return sendStatus;
  }

  getFcValue(fcName: string): number {
    return this.statServ.statusForm.get(fcName)?.value;
  }

  toggleColor(fcName: string, i: number):string {
    if(this.getFcValue(fcName) >= i) {
      return 'nrd';
    }
    return 'ngrn';
  }

  toggleSpecColor(i: number):string {
    if (i == 0) {
      return 'nrng';
    }
    if (i > 0) {
      return 'nrd';
    }
    return 'ngrn';
  }

  getModosito(i: number): number {
    const terheles = Math.floor(i-i/2-1);
    if (terheles < 0) {
      return 0;
    }
    return terheles;
  }

  getMaxMod(): number {
    const astral = this.getFcValue('astral');
    const body = this.getFcValue('body');
    if (astral > body) {
      return this.getModosito(astral);
    }
    return this.getModosito(body);
  }

  onSelectMode(i: number, type: string) {
    this.akcio = i;
    this.sebzes = type;
    this.hideMe = true
  }

  ngOnInit(): void {
    this.statServ.createStatus();
  }

}
