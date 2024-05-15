import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal.service';
import { Subject, map } from 'rxjs';
import { ResourcesService } from 'src/app/characters/chars-subforms/resources/resources.service';
import { SelectWAddonsComponent } from './select-wAddons.component';
import { WAddonsModel } from 'src/app/characters/chars-subforms/items/weapons/weapons.model';
import { WeaponsService } from 'src/app/characters/chars-subforms/items/weapons/weapons.service';

const BACKEND_URL = environment.apiUrl + "/wAddon/";

@Injectable({
  providedIn: 'root'
})
export class SelectWAddonService {

  constructor(
    private http: HttpClient,
    private modalServ: ModalService,
    private resServ: ResourcesService,
    private weaponsServ: WeaponsService,
  ) { }

  public wAddonsList: WAddonsModel[] = [];
  private wAddonsUpdated = new Subject<{wAddons: WAddonsModel[]}>();

  getWAddons() {
    return this.http
    .get<{ message: string; addons: any}>(BACKEND_URL + "list")
    .pipe(
      map(w => {
        return {
          wAddons: (w as any).addons.map((w: any) => {
            return {
              _id: w._id,
              nev: w.addonName,
              csoport: w.addonCategory,
              kieg: w.addonPlace,
              suly: w.addonAddWeight,
              sulySzorzo: w.addonMultiWeight,
              ar: w.addonAddPrice,
              arSzorzo: w.addonMultiPrice,
              megjegyzes: w.addonDesc
            };
          })
        };
      })
      )
      .subscribe((w: any) => {
      this.wAddonsList = w.wAddons;
      this.wAddonsUpdated.next({
        wAddons: [...this.wAddonsList]
      });
    });
  }

  getWAddonsUpdateListener() {
    return this.wAddonsUpdated.asObservable();
  }

  openModal(i:number, csoport: string, exclude: Array<string>) {
    this.modalServ.openModal(SelectWAddonsComponent, {
      moneyFilter: this.resServ.getFc('szabadToke').value,
      csoportFilter: csoport,
      excludeArr: exclude
    }).subscribe(
      w => this.weaponsServ.addWAddon(w, i)
    );
  }

}
