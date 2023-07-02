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

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  loadData(modalData: any): void {
  }

  private armorSub!: Subscription;
  public armorsList: ArmorsModel[] = [];

  selectArmor(addNev: string, addKateg: string, addSzint: number, addSuly: number, addAr: number, addMegj: string) {
    this.closeEvent.next([addNev, addKateg, addSzint, addSuly, addAr, addMegj]);
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
