import { Component } from '@angular/core';
import { SelectWeaponService } from './select-weapons.service';
import { SpinnerService } from '../../spinner/spinner.service';
import { Subject, Subscription, filter } from 'rxjs';
import { WeaponsModel } from 'src/app/characters/chars-subforms/weapons/weapons.model';

@Component({
  selector: 'app-select-weapons',
  templateUrl: './select-weapons.component.html',
  styleUrls: ['./select-weapons.component.css']
})
export class SelectWeaponsComponent {

  constructor(
    private sWeaponServ: SelectWeaponService,
    private spinServ: SpinnerService
  ) {}

  public moneyFilter: number = 0;
  public csoportFilter: string = 'Nincs';

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  loadData(modalData: any): void {
    this.moneyFilter = modalData.moneyFilter;
  }

  private weaponSub!: Subscription;
  public weaponsList: WeaponsModel[] = [];

  selectFilter(status: string) {
    return this.csoportFilter = status;
  }

  getCsoportok():Array<any> {
    const csoport = this.sWeaponServ.weaponsList.map(x => x.csoport);
    const csopUniq = [...new Set(csoport.map(x=> x))];
    return csopUniq;
  }

  getFilteredCsoportok(): Array<any> {
    if (this.csoportFilter == 'Nincs') {
      return this.getCsoportok();
    }
    return [this.csoportFilter];
  }

  getFilteredWeaponsList(csoport: string): Array<any> {
    const filtered = this.weaponsList.filter(x=>x.ar <= this.moneyFilter && x.csoport == csoport);
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
