import { Component } from '@angular/core';
import { SelectWAddonService } from './select-wAddons.service';
import { SpinnerService } from '../../spinner/spinner.service';
import { Subject, Subscription} from 'rxjs';
import { SortMeService } from '../../sortme/sort-me.service';
import { WAddonsModel } from 'src/app/characters/chars-subforms/weapons/weapons.model';

@Component({
  selector: 'app-select-wAddons',
  templateUrl: './select-wAddons.component.html',
  styleUrls: ['./select-wAddons.component.css']
})
export class SelectWAddonsComponent {

  constructor(
    private sWAddonServ: SelectWAddonService,
    private spinServ: SpinnerService,
    private sortServ: SortMeService
  ) {}

  public moneyFilter: number = 0;
  public csoportFilter: string = 'Nincs';
  public explosives: boolean = false;

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  loadData(modalData: any): void {
    this.moneyFilter = modalData.moneyFilter;
    this.explosives = modalData.explosives;
  }

  private wAddonSub!: Subscription;
  public wAddonsList: WAddonsModel[] = [];

  selectFilter(status: string) {
    return this.csoportFilter = status;
  }

  getCsoportok():Array<any> {
    const list = this.sWAddonServ.wAddonsList;
    const csopUniq = [...new Set(list.map(x => x.csoport).map(x=> x))];
    csopUniq.sort();
    return csopUniq;
  }

  getFilteredCsoportok(): Array<any> {
    if (this.csoportFilter == 'Nincs') {
      return this.getCsoportok();
    }
    return [this.csoportFilter];
  }

  getFilteredWAddonsList(csoport: string): Array<any> {
    const filtered = this.wAddonsList.filter(x=>x.ar <= this.moneyFilter && x.csoport == csoport);
    this.sortServ.sortByString(filtered, 'nev');
    return filtered;
  }

  selectWAddon(_id: string) {
    const wAddon = this.wAddonsList.filter(x => x._id == _id)[0];
    this.closeEvent.next(wAddon);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next(''),
    this.closeEvent.complete()
  }

  ngOnInit(): void {
    this.spinServ.toggleSpinner(false);
    this.sWAddonServ.getWAddons();
    this.wAddonSub = this.sWAddonServ.getWAddonsUpdateListener()
    .subscribe((w: {wAddons: WAddonsModel[]}) => {
      this.spinServ.toggleSpinner(false);
      this.wAddonsList = w.wAddons;
    });
  }

}
