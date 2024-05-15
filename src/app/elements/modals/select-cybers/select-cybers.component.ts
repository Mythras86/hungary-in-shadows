import { Component } from '@angular/core';
import { SelectCyberService } from './select-cybers.service';
import { SpinnerService } from '../../spinner/spinner.service';
import { Subject, Subscription } from 'rxjs';
import { CybersModel } from 'src/app/characters/chars-subforms/items/cybers/cybers.model';

@Component({
  selector: 'app-select-cybers',
  templateUrl: './select-cybers.component.html',
  styleUrls: ['./select-cybers.component.css']
})
export class SelectCybersComponent {

  constructor(
    private sCyberServ: SelectCyberService,
    private spinServ: SpinnerService
  ) {}

  public moneyFilter: number = 0;
  public essenceFilter: number = 0;
  public csoportFilter: string = 'Nincs';

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  loadData(modalData: any): void {
    this.moneyFilter = modalData.moneyFilter;
    this.essenceFilter = modalData.essenceFilter;
  }

  private cyberSub!: Subscription;
  public cybersList: CybersModel[] = [];

  selectFilter(status: string) {
    return this.csoportFilter = status;
  }

  getCsoportok():Array<any> {
    const csoport = this.sCyberServ.cybersList.map(x => x.csoport);
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

  getFilteredCybersList(csoport: string): Array<any> {
    const filtered = this.cybersList.filter(x=>x.ar <= this.moneyFilter && x.esszencia <= this.essenceFilter && x.csoport == csoport);
    return filtered;
  }

  selectCyber(_id: string) {
    const cyber = this.cybersList.filter(x => x._id == _id)[0];
    this.closeEvent.next(cyber);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next(''),
    this.closeEvent.complete()
  }

  ngOnInit(): void {
    this.spinServ.toggleSpinner(false);
    this.sCyberServ.getCybers();
    this.cyberSub = this.sCyberServ.getCybersUpdateListener()
    .subscribe((w: {cybers: CybersModel[]}) => {
      this.spinServ.toggleSpinner(false);
      this.cybersList = w.cybers;
    });
  }

}
