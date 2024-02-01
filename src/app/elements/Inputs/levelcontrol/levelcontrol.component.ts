import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { LevelcontrolService } from './levelcontrol.service';
import { FormControl } from '@angular/forms';
import { ResourcesService } from 'src/app/characters/chars-subforms/resources/resources.service';
import { AttributesService } from 'src/app/characters/chars-subforms/attributes/attributes.service';

@Component({
  selector: 'app-levelcontrol',
  templateUrl: './levelcontrol.component.html',
  styleUrls: ['./levelcontrol.component.css']
})
export class LevelcontrolComponent {

  constructor(
    public s: LevelcontrolService,
    public resS: ResourcesService,
    public attrS: AttributesService,
  ) { }

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  @Output() buttonAction: EventEmitter<void> = new EventEmitter();

  public ertekValtozas: number = 0;

  @Input() isEnabled: boolean = false;

  loadData(modalData: any): void {
    this.s.fejlec = modalData.fejlec;
    this.s.megjegyzes = modalData.megjegyzes;
    this.s.lepes = modalData.lepes;
    this.s.valto = modalData.valto;
    this.s.tokeKtsg = modalData.tokeKtsg;
    this.s.karmaKtsg = modalData.karmaKtsg;
    this.s.forrasControl = modalData.forrasControl;
    this.s.egysegF = modalData.egysegF;
    this.s.celControl = modalData.celControl;
    this.s.egysegC = modalData.egysegC;
    this.s.minErtek = modalData.minErtek;
    this.s.maxErtek = modalData.maxErtek;
  }

  changeValue(lepes: number):void {
    this.ertekValtozas = this.ertekValtozas*1+1*lepes;
  }

  buttonDisDec(lepes:number): boolean {
    if (
      this.ertekValtozas-lepes < 0
      ) {
      return true;
    }
    return false;
  }

  buttonDisInc(lepes: number): boolean {
    if (
      lepes*this.s.karmaKtsg > (this.s.maxErtek-this.ertekValtozas*this.s.karmaKtsg) ||
      lepes*this.s.tokeKtsg > (this.s.maxErtek-this.ertekValtozas*this.s.tokeKtsg)
      ) {
      return true;
    }
    return false;
  }

  onSave() {
    this.closeEvent.next(this.ertekValtozas);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next(null),
    this.closeEvent.complete()
  }

  ngOnInit(): void {
  }
}
