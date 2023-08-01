import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal.service';
import { Subject, map } from 'rxjs';
import { ResourcesService } from 'src/app/characters/chars-subforms/resources/resources.service';
import { SelectWeaponsComponent } from './select-weapons.component';
import { WeaponsService } from 'src/app/characters/chars-subforms/weapons/weapons.service';
import { WeaponsModel } from 'src/app/characters/chars-subforms/weapons/weapons.model';
import { ExplosivesService } from 'src/app/characters/chars-subforms/explosives/explosives.service';

const BACKEND_URL = environment.apiUrl + "/weapon/";

@Injectable({
  providedIn: 'root'
})
export class SelectWeaponService {

    constructor(
      private http: HttpClient,
      private modalServ: ModalService,
      private resServ: ResourcesService,
      private weaponsServ: WeaponsService,
      private explosivesServ: ExplosivesService,
    ) { }

    public weaponsList: WeaponsModel[] = [];
    private weaponsUpdated = new Subject<{weapons: WeaponsModel[]}>();

    getWeapons() {
      return this.http
      .get<{ message: string; weapons: any}>(BACKEND_URL + "list")
      .pipe(
        map(w => {
          return {
            weapons: (w as any).weapons.map((w: any) => {
              return {
                _id: w._id,
                nev: w.weaponName,
                csoport: w.weaponCategory,
                tipus: w.weaponType,
                ero: w.weaponPower,
                sebzes: w.weaponDamage,
                sebzesTipus: w.weaponDmgType,
                tamadasiModok: w.weaponMods,
                tav: w.weaponRange,
                tar: w.weaponClip,
                ar: w.weaponPrice,
                suly: w.weaponWeight,
                megjegyzes: w.weaponDesc
              };
            })
          };
        })
        )
        .subscribe((w: any) => {
        this.weaponsList = w.weapons;
        this.weaponsUpdated.next({
          weapons: [...this.weaponsList]
        });
      });
    }

    getWeaponsUpdateListener() {
      return this.weaponsUpdated.asObservable();
    }

    openModal(status: boolean) {
      this.modalServ.openModal(SelectWeaponsComponent, {
        moneyFilter: this.resServ.getFc('elkolthetoToke').value,
        explosives: status
      }).subscribe(
        w => {
          if (status == false) {
            return this.weaponsServ.addWeapon(w);
          }
          return this.explosivesServ.addExplosive(w);
        }
      );
    }

  }
