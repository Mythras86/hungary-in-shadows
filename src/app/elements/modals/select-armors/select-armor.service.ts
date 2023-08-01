import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { ArmorsModel } from 'src/app/characters/chars-subforms/armors/armors.model';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal.service';
import { SelectArmorsComponent } from './select-armors.component';
import { ArmorsService } from 'src/app/characters/chars-subforms/armors/armors.service';
import { ResourcesService } from 'src/app/characters/chars-subforms/resources/resources.service';

const BACKEND_URL = environment.apiUrl + "/armor/";

@Injectable({
  providedIn: 'root'
})
export class SelectArmorService {


  constructor(
    private http: HttpClient,
    private modalServ: ModalService,
    private armorsServ: ArmorsService,
    private resServ: ResourcesService,
  ) { }

  public armorsList: ArmorsModel[] = [];
  private armorsUpdated = new Subject<{armors: ArmorsModel[]}>();

  getArmors() {
    return this.http
    .get<{ message: string; armors: any}>(BACKEND_URL + "list")
    .pipe(
      map(w => {
        return {
          armors: (w as any).armors.map((w: any) => {
            return {
              _id: w._id,
              nev: w.armorName,
              csoport: w.armorCategory,
              szint: w.armorRating,
              suly: w.armorWeight,
              ar: w.armorPrice,
              megjegyzes: w.armorDesc,
            };
          })
        };
      })
      )
      .subscribe((w: any) => {
      this.armorsList = w.armors;
      this.armorsUpdated.next({
        armors: [...this.armorsList]
      });
    });
  }

  getArmorsUpdateListener() {
    return this.armorsUpdated.asObservable();
  }

  openModal() {
    this.modalServ.openModal(SelectArmorsComponent, {moneyFilter: this.resServ.getFc('elkolthetoToke').value}).subscribe(
      w => this.armorsServ.addArmor(w)
      );
  }

}
