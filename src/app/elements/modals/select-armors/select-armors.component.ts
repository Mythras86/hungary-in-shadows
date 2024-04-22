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
    private s: SelectArmorService,
    private spinServ: SpinnerService
  ) {}

  public moneyFilter: number = 0;
  public csoportFilter: string = 'Nincs';

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  loadData(modalData: any): void {
    this.moneyFilter = modalData.moneyFilter;
  }

  selectFilter(status: string) {
    return this.csoportFilter = status;
  }

  getCsoportok():Array<any> {
    const csoport = this.s.armorsList.map(x => x.csoport);
    const csopUniq = [...new Set(csoport.map(x=> x))];
    csopUniq.sort();
    return csopUniq;
  }

  getFilteredCsoportok(): Array<any> {
    if (this.csoportFilter == 'Nincs') {
      return this.getCsoportok();
    }
    return [this.csoportFilter];
  }

  getFilteredArmorsList(csoport: string): Array<any> {
    const filtered = this.s.armorsList.filter(x=>x.ar <= this.moneyFilter).filter(x=> x.csoport == csoport);
    return filtered;
  }

  selectArmor(_id: string) {
    const armor = this.s.armorsList.filter(x => x._id == _id)[0];
    this.closeEvent.next(armor);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next(''),
    this.closeEvent.complete()
  }

  ngOnInit(): void {
    this.spinServ.toggleSpinner(false);
    this.s.getArmors();
    this.s.getArmorsUpdateListener()
    .subscribe((w: {armors: ArmorsModel[]}) => {
      this.spinServ.toggleSpinner(false);
      this.s.armorsList = w.armors;
    });
  }

}
