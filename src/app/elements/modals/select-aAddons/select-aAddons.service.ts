import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal.service';
import { Subject, map } from 'rxjs';
import { ResourcesService } from 'src/app/characters/chars-subforms/resources/resources.service';
import { SelectAAddonsComponent } from './select-aAddons.component';
import { ArmorsService } from 'src/app/characters/chars-subforms/armors/armors.service';
import { AAddonsModel } from 'src/app/characters/chars-subforms/armors/armors.model';

const BACKEND_URL = environment.apiUrl + "/aAddon/";

@Injectable({
  providedIn: 'root'
})
export class SelectAAddonService {

  constructor(
    private http: HttpClient,
    private modalServ: ModalService,
    private resServ: ResourcesService,
    private armorsServ: ArmorsService,
  ) { }

  public aAddonsList: AAddonsModel[] = [];
  private aAddonsUpdated = new Subject<{aAddons: AAddonsModel[]}>();

  getAAddons() {
    return this.http
    .get<{ message: string; addons: any}>(BACKEND_URL + "list")
    .pipe(
      map(w => {
        return {
          aAddons: (w as any).addons.map((w: any) => {
            return {
              _id: w._id,
              nev: w.addonName,
              csoport: w.addonPlace,
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
      this.aAddonsList = w.aAddons;
      this.aAddonsUpdated.next({
        aAddons: [...this.aAddonsList]
      });
    });
  }

  getAAddonsUpdateListener() {
    return this.aAddonsUpdated.asObservable();
  }

  openModal(i:number, csoport: string) {
    this.modalServ.openModal(SelectAAddonsComponent, {
      moneyFilter: this.resServ.getFc('elkolthetoToke').value,
      csoportFilter: csoport,
    }).subscribe(
      w => this.armorsServ.addAAddon(w, i)
    );
  }

}
