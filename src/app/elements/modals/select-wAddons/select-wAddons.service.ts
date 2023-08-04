import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal.service';
import { Subject, map } from 'rxjs';
import { ResourcesService } from 'src/app/characters/chars-subforms/resources/resources.service';
import { SelectWAddonsComponent } from './select-wAddons.component';
import { ExplosivesService } from 'src/app/characters/chars-subforms/explosives/explosives.service';
import { WAddonsModel } from 'src/app/characters/chars-subforms/weapons/weapons.model';
import { WeaponsService } from 'src/app/characters/chars-subforms/weapons/weapons.service';

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
    .get<{ message: string; wAddons: any}>(BACKEND_URL + "list")
    .pipe(
      map(w => {
        return {
          wAddons: (w as any).wAddons.map((w: any) => {
            return {
              _id: w._id,
              nev: w.wAddonName,
              csoport: w.wAddonCategory,
              tipus: w.wAddonType,
              ero: w.wAddonPower,
              sebzes: w.wAddonDamage,
              sebzesTipus: w.wAddonDmgType,
              tamadasiModok: w.wAddonMods,
              tav: w.wAddonRange,
              tar: w.wAddonClip,
              ar: w.wAddonPrice,
              suly: w.wAddonWeight,
              megjegyzes: w.wAddonDesc
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

  openModal(i:number) {
    this.modalServ.openModal(SelectWAddonsComponent, {
      moneyFilter: this.resServ.getFc('elkolthetoToke').value,
    }).subscribe(
      w => this.weaponsServ.addWAddon(w, i)
    );
  }

}
