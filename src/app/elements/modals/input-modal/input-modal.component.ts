import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AModal } from '../modal.abstract';
import { InputModalService } from './input-modal.service';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.css']
})
export class InputModalComponent implements OnInit, AModal {

    constructor(
      public inputModServ: InputModalService,
    ) { }

    public canBeClosed: boolean = true;
    closeEvent: Subject<any> = new Subject;

    @Input() fcPath: any = '';
    @Input() fcName: string = '';
    @Input() tipus: string = '';
    @Input() fejlec: string = '';
    @Input() megjegyzes: Array<string> = [];
    @Input() ertek: any;
    @Input() lista: any;
    @Input() egyseg: string = '';

    public isButton: boolean = true;
    @Input() isEnabled: boolean = false;

    toggleIsButton() {
      this.isButton = !this.isButton;
    }

    loadData(modalData: any): void {
      this.fcPath = modalData.fcPath;
      this.fcName = modalData.fcName;
      this.tipus = modalData.tipus;
      this.fejlec = modalData.fejlec;
      this.megjegyzes = modalData.megjegyzes;
      this.ertek = modalData.ertek;
      this.lista = modalData.lista;
      this.egyseg = modalData.egyseg;
      this.toggleIsButton();
    }

    onSave(id:string) {
      const input:any = document.getElementById(id);
      if (this.tipus == 'number') {
        this.closeEvent.next(Math.round(input.value*100)/100);
        this.closeEvent.complete();
      }
      this.closeEvent.next(input.value);
      this.closeEvent.complete();
    }

    onClose() {
      this.closeEvent.next(this.ertek),
      this.closeEvent.complete()
    }

    ngOnInit(): void {
    }
  }
