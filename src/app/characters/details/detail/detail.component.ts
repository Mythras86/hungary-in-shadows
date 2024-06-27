import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  constructor(
    public select: ItemSelectService
  ) {}

  @Input() editMode: boolean = false;
  @Input() nev: string = '';
  @Input() tipus: string = '';
  @Input() egyseg: string = '';
  @Input() fcName: string = '';
  @Input() megjegyzes: string = '';
  @Input() meret: string = '';
  @Input() ertek: any;
  @Input() lista: Array<any> = [];

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  loadData(modalData: any): void {
    this.editMode = modalData.editMode;
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
      this.closeEvent.next(Math.round(input*100)/100);
      this.closeEvent.complete();
    } else {
      this.closeEvent.next(input);
      this.closeEvent.complete();
    }
  }

  onClose() {
    this.closeEvent.complete();
  }

}
