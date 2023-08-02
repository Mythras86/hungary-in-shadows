import { Component } from '@angular/core';
import { SelectSpiritsService } from './select-spirits.service';
import { SpinnerService } from '../../spinner/spinner.service';
import { Subject, Subscription } from 'rxjs';
import { SpiritsModel } from 'src/app/characters/chars-subforms/spirits/spirits.model';

@Component({
  selector: 'app-select-spirits',
  templateUrl: './select-spirits.component.html',
  styleUrls: ['./select-spirits.component.css']
})
export class SelectSpiritsComponent {

  constructor(
    private sSpiritsServ: SelectSpiritsService,
    private spinServ: SpinnerService
  ) {}

  public moneyFilter: number = 0;
  public karmaFilter: number = 0;
  public csoportFilter: string = 'Nincs';

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  loadData(modalData: any): void {
    this.moneyFilter = modalData.moneyFilter;
    this.karmaFilter = modalData.karmaFilter;
  }

  private spiritSub!: Subscription;
  public spiritsList: SpiritsModel[] = [];

  selectFilter(status: string) {
    return this.csoportFilter = status;
  }

  getCsoportok():Array<any> {
    const csoport = this.sSpiritsServ.spiritsList.map(x => x.csoport);
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

  getFilteredSpiritsList(csoport: string): Array<any> {
    const filtered = this.spiritsList.filter(x=> x.csoport == csoport);
    return filtered;
  }

  selectSpirit(_id: string) {
    const spirit = this.spiritsList.filter(x => x._id == _id)[0];

    this.closeEvent.next(spirit);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next(''),
    this.closeEvent.complete()
  }

  ngOnInit(): void {
    this.spinServ.toggleSpinner(false);
    this.sSpiritsServ.getSpirits();
    this.spiritSub = this.sSpiritsServ.getSpiritsUpdateListener()
    .subscribe((w: {spirits: SpiritsModel[]}) => {
      this.spinServ.toggleSpinner(false);
      this.spiritsList = w.spirits;
    });
  }

}
