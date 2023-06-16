import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { LevelcontrolService } from './levelcontrol.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-levelcontrol',
  templateUrl: './levelcontrol.component.html',
  styleUrls: ['./levelcontrol.component.css']
})
export class LevelcontrolComponent {

  constructor(
    public lvlContServ: LevelcontrolService,
  ) { }

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  @Output() buttonAction: EventEmitter<void> = new EventEmitter();

  public fejlec: string = '';
  public megjegyzes: any = '';
  public jutalom: number = 0;
  public lepes: number = 0;
  public egyseg: string = '';
  public ktsg: number = 0;
  public forrasErtekUtv!: FormControl;
  public ellenErtekUtv!: FormControl;
  public minErtek: number = 0;
  public maxErtek: number = 0;

  public ertekValtozas: number = 0;

  public isButton: boolean = true;
  @Input() isEnabled: boolean = false;

  toggleIsButton() {
    this.isButton = !this.isButton;
  }

  loadData(modalData: any): void {
    this.fejlec = modalData.fejlec;
    this.megjegyzes = modalData.megjegyzes;
    this.jutalom = modalData.jutalom;
    this.lepes = modalData.lepes;
    this.egyseg = modalData.egyseg;
    this.ktsg = modalData.ktsg;
    this.forrasErtekUtv = modalData.forrasErtekUtv;
    this.ellenErtekUtv = modalData.ellenErtekUtv;
    this.minErtek = modalData.minErtek;
    this.maxErtek = modalData.maxErtek;
    this.toggleIsButton();
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
    if (this.minErtek+this.ertekValtozas+lepes>maxErtek
      || this.ellenErtekUtv.value-this.ertekValtozas*this.ktsg-lepes*this.ktsg<0
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
