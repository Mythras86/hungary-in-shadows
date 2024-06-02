import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { InpDetailsService } from './inp-details.service';
import { ItemSelectService } from '../../item-select/item-select.service';
import { DetailsService } from 'src/app/characters/details/details.service';

@Component({
  selector: 'app-inp-details',
  templateUrl: './inp-details.component.html',
  styleUrls: ['./inp-details.component.scss']
})
export class InpDetailsComponent {

  constructor(
    public s: InpDetailsService,
    public detailsS: DetailsService,
    public select: ItemSelectService
  ) {}

  @Input() mode: string = '';
  @Input() nev: string = '';
  @Input() tipus: string = '';
  @Input() egyseg: string = '';
  @Input() fcName: string = '';
  @Input() megjegyzes: string = '';
  @Input() meret: string = '';
  @Input() ertek: string = '';
  @Input() lista: Array<any> = [];

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  @Output() buttonAction: EventEmitter<void> = new EventEmitter();

  loadData(modalData: any): void {
    this.mode = modalData.mode;
    this.nev = modalData.nev;
    this.tipus = modalData.tipus;
    this.egyseg = modalData.egyseg;
    this.fcName = modalData.fcName;
    this.megjegyzes = modalData.megjegyzes;
    this.ertek = modalData.ertek;
    this.lista = modalData.lista;
  }

  onSave(id:string) {
    const input:any = (<HTMLInputElement>document.getElementById(id)).value;
    if (this.tipus == 'number') {
      this.closeEvent.next([id, Math.round(input*100)/100]);
      this.closeEvent.complete();
    } else {
      this.closeEvent.next([id, input]);
      this.closeEvent.complete();
    }
  }

  onClose() {
    this.closeEvent.complete();
  }

}
