import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  private armorSub!: Subscription;
  public armorsList: ArmorsModel[] = [];

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
