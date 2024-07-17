import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { AttributesService } from 'src/app/characters/attributes/attributes.service';
import { ResourcesService } from 'src/app/characters/resources/resources.service';

@Component({
  selector: 'app-levelcontrol',
  templateUrl: './levelcontrol.component.html',
  styleUrls: ['./levelcontrol.component.scss']
})
export class LevelcontrolComponent {

  constructor(
    public resS: ResourcesService,
    public attrS: AttributesService,
  ) { }

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  @Output() buttonAction: EventEmitter<void> = new EventEmitter();
  @Input() isEnabled: boolean = false;

  fejlec: string = '';
  megjegyzes: any;
  lepes: number = 0;
  valto: number = 0;
  tokeKtsg: number = 0;
  karmaKtsg: number = 0;
  esszKtsg: number = 0;
  celErtek: number = 0;
  egyseg: any;
  minErtek: number = 0;
  maxErtek: number = 0;

  public ertekValtozas: number = 0;

  loadData(modalData: any): void {
    this.fejlec = modalData.fejlec;
    this.megjegyzes = modalData.megjegyzes;
    this.lepes = modalData.lepes;
    this.valto = modalData.valto;
    this.tokeKtsg = modalData.tokeKtsg;
    this.karmaKtsg = modalData.karmaKtsg;
    this.esszKtsg = modalData.esszKtsg;
    this.celErtek = modalData.celErtek;
    this.egyseg = modalData.egyseg;
    this.minErtek = modalData.minErtek;
    this.maxErtek = modalData.maxErtek;
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
      this.karmaKtsg*this.ertekValtozas + this.karmaKtsg*lepes > this.resS.getSzabadKarma() ||
      this.tokeKtsg*this.ertekValtozas + this.tokeKtsg*lepes > this.resS.getSzabadToke() ||
      this.esszKtsg*this.ertekValtozas + this.esszKtsg*lepes > this.attrS.getTulErtek('esszencia') ||
      this.celErtek + this.ertekValtozas*lepes >= this.maxErtek*this.valto ||
      this.maxErtek*this.valto - this.minErtek*this.valto < lepes*this.valto
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
    this.closeEvent.complete();
  }

  ngOnInit(): void {
  }
}
