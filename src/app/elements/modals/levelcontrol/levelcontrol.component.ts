import { Component } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-levelcontrol',
  templateUrl: './levelcontrol.component.html',
  styleUrls: ['./levelcontrol.component.css']
})
export class LevelcontrolComponent {

  constructor(
  ) { }

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  public fejlec: string = '';
  public megjegyzes: string = '';
  public valtErtekUtv: string = '';
  public jutalom: number = 0;
  public lepes: number = 0;
  public egyseg: string = '';
  public ktsg: number = 0;
  public ellenErtekUtv: string = '';
  public maxErtek: number = 0;
  public minErtek: number = 0;

  public ertekValtozas: number = 0;

  loadData(modalData: any): void {
    this.fejlec = modalData.fejlec;
    this.megjegyzes = modalData.megjegyzes;
    this.valtErtekUtv = modalData.valtErtekUtv;
    this.jutalom = modalData.jutalom;
    this.lepes = modalData.lepes;
    this.egyseg = modalData.egyseg;
    this.ktsg = modalData.ktsg;
    this.ellenErtekUtv = modalData.ellenErtekUtv;
    this.maxErtek = modalData.maxErtek;
    this.minErtek = modalData.minErtek;
  }

  getValue(fcName: any): number {
    return fcName.value;
  }

  changeValue(lepes: number):any {
    return this.ertekValtozas = this.ertekValtozas*1+1*lepes;
  }

  buttonDisDec(lepes:number): boolean {
    if (this.ertekValtozas-lepes<0) {
      return true;
    }
    return false;
  }

  buttonDisInc(maxErtek:number, lepes:number): boolean {
    if (this.ertekValtozas*this.ktsg+lepes*this.ktsg>maxErtek
      || this.getValue(this.ellenErtekUtv)-this.ertekValtozas*this.ktsg-lepes*this.ktsg<0
      ) {
      return true;
    }
    return false;
  }

  onSave() {
    this.closeEvent.next([this.getValue(this.valtErtekUtv) + this.ertekValtozas*this.jutalom,
      this.getValue(this.ellenErtekUtv) - this.ertekValtozas*this.ktsg]);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next([this.getValue(this.valtErtekUtv), this.getValue(this.ellenErtekUtv)]),
    this.closeEvent.complete()
  }

  ngOnInit(): void {
  }
}
