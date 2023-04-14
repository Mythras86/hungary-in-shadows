import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AModal } from '../modal.abstract';
import { DetailsService } from 'src/app/characters/chars-main/chars-subforms/details/details.service';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.css']
})
export class InputModalComponent implements OnInit, AModal {

    constructor(
      public detailsServ: DetailsService
    ) { }

    public canBeClosed: boolean = true;
    closeEvent: Subject<string> = new Subject;

    public tipus: string = '';
    public fejlec: string = '';
    public megjegyzes: string = '';
    public ertek: any;

    loadData(modalData: any): void {
      this.tipus = modalData.tipus;
      this.fejlec = modalData.fejlec;
      this.megjegyzes = modalData.megjegyzes;
      this.ertek = modalData.ertek;
    }

    onSave() {
      const inputValue: any = document.getElementById('modalInput');
      this.closeEvent.next(inputValue.value);
      this.closeEvent.complete();
    }

    onClose() {
      this.closeEvent.next('none');
      this.closeEvent.complete();
    }

    ngOnInit(): void {
    }
  }
