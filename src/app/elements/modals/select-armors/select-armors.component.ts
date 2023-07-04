import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ArmorsModel } from 'src/app/characters/chars-subforms/armors/armors.model';
import { SelectArmorService } from './select-armor.service';
import { SpinnerService } from '../../spinner/spinner.service';

@Component({
  selector: 'app-select-armors',
  templateUrl: './select-armors.component.html',
  styleUrls: ['./select-armors.component.css']
})
export class SelectArmorsComponent implements OnInit {

  constructor(
    private selArmorServ: SelectArmorService,
    private spinServ: SpinnerService
  ) {}

  public moneyFilter: number = 0;
  public csoportFilter: string = 'Nincs'

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  loadData(modalData: any): void {
    this.moneyFilter = modalData.moneyFilter;
  }

  private armorSub!: Subscription;
  public armorsList: ArmorsModel[] = [];

  selectFilter(status: string) {
    return this.csoportFilter = status;
  }

  getCsoportok():Array<any> {
    const csoport = this.selArmorServ.armorsList.map(x => x.csoport);
    const csopUniq = [...new Set(csoport.map(x=> x))];
    return csopUniq;
  }

  getFilteredCsoportok(): Array<any> {
    if (this.csoportFilter == 'Nincs') {
      return this.getCsoportok();
    }
    return [this.csoportFilter];
  }

  getFilteredArmorsList(csoport: string): Array<any> {
    const filtered = this.armorsList.filter(x=>x.ar <= this.moneyFilter).filter(x=> x.csoport == csoport);
    return filtered;
  }

  selectArmor(addNev: string, addCsop: string, addSzint: number, addSuly: number, addAr: number, addMegj: string) {
    this.closeEvent.next([addNev, addCsop, addSzint, addSuly, addAr, addMegj]);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next(''),
    this.closeEvent.complete()
  }

  ngOnInit(): void {
    this.spinServ.toggleSpinner(false);
    this.selArmorServ.getArmors();
    this.armorSub = this.selArmorServ.getArmorsUpdateListener()
    .subscribe((w: {armors: ArmorsModel[]}) => {
      this.spinServ.toggleSpinner(false);
      this.armorsList = w.armors;
    });
  }

}
