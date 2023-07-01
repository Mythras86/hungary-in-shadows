import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { ArmorsModel } from 'src/app/characters/chars-subforms/armors/armors.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + "/armors/";

@Injectable({
  providedIn: 'root'
})
export class SelectArmorService {


  constructor(
    private http: HttpClient,
  ) { }

  public armorsList: ArmorsModel[] = [];
  private armorsUpdated = new Subject<{armors: ArmorsModel[]}>();

  getArmors() {
    return this.http
    .get<{ message: string; armors: any}>(BACKEND_URL + "list")
    .pipe(
      map(w => {
        return {
          armors: (w as any).armors.map((w: ArmorsModel) => {
            return {
              _id: w._id,
              armorName: w.nev,
              armorCategory: w.kategoria,
              armorRating: w.szint,
              armorWeight: w.suly,
              armorPrice: w.ar,
              armorDesc: w.megjegyzes,
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


}
