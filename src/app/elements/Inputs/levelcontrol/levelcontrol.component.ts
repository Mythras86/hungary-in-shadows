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

  public fejlec: string = '';
  public megjegyzes: any = '';
  public lepes: number = 0;
  public valto: number = 0;
  public tokeKtsg: number = 0;
  public karmaKtsg: number = 0;
  public forrasControl!: FormControl;
  public egysegF: string = '';
  public celControl!: FormControl;
  public egysegC: string = '';
  public minErtek: number = 0;
  public maxErtek: number = 0;

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  @Output() buttonAction: EventEmitter<void> = new EventEmitter();

  public ertekValtozas: number = 0;

  @Input() isEnabled: boolean = false;

  loadData(modalData: any): void {
    this.fejlec = modalData.fejlec;
    this.megjegyzes = modalData.megjegyzes;
    this.lepes = modalData.lepes;
    this.valto = modalData.valto;
    this.tokeKtsg = modalData.tokeKtsg;
    this.karmaKtsg = modalData.karmaKtsg;
    this.forrasControl = modalData.forrasControl;
    this.egysegF = modalData.egysegF;
    this.celControl = modalData.celControl;
    this.egysegC = modalData.egysegC;
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
      lepes*this.karmaKtsg > (this.maxErtek-this.ertekValtozas*this.karmaKtsg) ||
      lepes*this.tokeKtsg > (this.maxErtek-this.ertekValtozas*this.tokeKtsg)
      ) {
      return true;
    }
    return false;
  }

  onSave() {
    this.closeEvent.next([this.ertekValtozas, this.karmaKtsg, this.tokeKtsg, this.valto, this.celControl]);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next(null);
    this.closeEvent.complete();
  }

  ngOnInit(): void {
  }
}
