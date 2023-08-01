import { Component } from '@angular/core';
import { SelectWeaponService } from './select-weapons.service';
import { SpinnerService } from '../../spinner/spinner.service';
import { Subject, Subscription, filter } from 'rxjs';
import { WeaponsModel } from 'src/app/characters/chars-subforms/weapons/weapons.model';
import { SortMeService } from '../../sortme/sort-me.service';

@Component({
  selector: 'app-select-weapons',
  templateUrl: './select-weapons.component.html',
  styleUrls: ['./select-weapons.component.css']
})
export class SelectWeaponsComponent {

  constructor(
    private sWeaponServ: SelectWeaponService,
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

  private weaponSub!: Subscription;
  public weaponsList: WeaponsModel[] = [];

  selectFilter(status: string) {
    return this.csoportFilter = status;
  }

  getCsoportok():Array<any> {
    const list = this.sWeaponServ.weaponsList;
    if (this.explosives) {
      const csopUniq = [...new Set(list.filter(x=> x.csoport == 'Robbanóanyagok').map(x => x.tipus).map(x=> x))];
      csopUniq.sort();
      return csopUniq;
    }
    const csopUniq = [...new Set(list.filter(x=> x.csoport != 'Robbanóanyagok').map(x => x.tipus).map(x=> x))];
    csopUniq.sort();
    return csopUniq;
  }

  getFilteredCsoportok(): Array<any> {
    if (this.csoportFilter == 'Nincs') {
      return this.getCsoportok();
    }
    return [this.csoportFilter];
  }

  getFilteredWeaponsList(tipus: string): Array<any> {
    const filtered = this.weaponsList.filter(x=>x.ar <= this.moneyFilter && x.tipus == tipus);
    this.sortServ.sortByString(filtered, 'nev');
    return filtered;
  }

  selectWeapon(_id: string) {
    const weapon = this.weaponsList.filter(x => x._id == _id)[0];
    this.closeEvent.next(weapon);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next(''),
    this.closeEvent.complete()
  }

  ngOnInit(): void {
    this.spinServ.toggleSpinner(false);
    this.sWeaponServ.getWeapons();
    this.weaponSub = this.sWeaponServ.getWeaponsUpdateListener()
    .subscribe((w: {weapons: WeaponsModel[]}) => {
      this.spinServ.toggleSpinner(false);
      this.weaponsList = w.weapons;
    });
  }

}
