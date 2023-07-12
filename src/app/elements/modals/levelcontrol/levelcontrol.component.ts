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
    public lvlContServ: LevelcontrolService,
    public resServ: ResourcesService,
    public attrServ: AttributesService,
  ) { }

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  @Output() buttonAction: EventEmitter<void> = new EventEmitter();

  public nev: string = '';
  public megjegyzes: any = '';
  public lepes: number = 0;
  public egyseg: string = '';
  public ar: number = 0;
  public karma: number = 0;
  public esszencia: number = 0;
  public forrasErtekUtv!: FormControl;
  public maxErtek: number = 0;

  public ertekValtozas: number = 0;

  public isButton: boolean = true;
  @Input() isEnabled: boolean = false;

  toggleIsButton() {
    this.isButton = !this.isButton;
  }

  loadData(modalData: any): void {
    this.nev = modalData.nev;
    this.megjegyzes = modalData.megjegyzes;
    this.lepes = modalData.lepes;
    this.egyseg = modalData.egyseg;
    this.ar = modalData.ar;
    this.karma = modalData.karma;
    this.esszencia = modalData.esszencia;
    this.forrasErtekUtv = modalData.forrasErtekUtv;
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
    if (this.forrasErtekUtv.value+this.ertekValtozas+lepes>maxErtek
      || this.resServ.getFc('elkolthetoToke')?.value-this.ertekValtozas*this.ar-lepes*this.ar<0
      || this.resServ.getFc('elkolthetoKarma')?.value-this.ertekValtozas*this.karma-lepes*this.karma<0
      || this.attrServ.getFc('esszencia')?.value-this.ertekValtozas*this.esszencia-lepes*this.esszencia<0
      ) {
      return true;
    }
    return false;
  }

  essCalc():number | null {
    const essz = this.attrServ.getFc('esszencia')?.value-this.ertekValtozas*this.esszencia;
    return Math.round(essz*1000)/1000;
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
