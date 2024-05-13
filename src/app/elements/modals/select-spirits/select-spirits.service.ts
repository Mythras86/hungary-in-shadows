import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalService } from '../modal.service';
import { ResourcesService } from 'src/app/characters/chars-subforms/resources/resources.service';
import { SpiritsService } from 'src/app/characters/chars-subforms/spirits/spirits.service';
import { Subject, map } from 'rxjs';
import { SpiritsModel } from 'src/app/characters/chars-subforms/spirits/spirits.model';
import { environment } from 'src/environments/environment';
import { SelectSpiritsComponent } from './select-spirits.component';


const BACKEND_URL = environment.apiUrl + "/spirit/";

@Injectable({
  providedIn: 'root'
})
export class SelectSpiritsService {

  constructor(
    private http: HttpClient,
    private modalServ: ModalService,
    private resServ: ResourcesService,
    private spiritsServ: SpiritsService,
  ) { }

  public spiritsList: SpiritsModel[] = [];
  private spiritsUpdated = new Subject<{spirits: SpiritsModel[]}>();

  getSpirits() {
    return this.http
    .get<{ message: string; spirits: any}>(BACKEND_URL + "list")
    .pipe(
      map(w => {
        return {
          spirits: (w as any).spirits.map((w: any) => {
            return {
              _id: w._id,
              nev: w.spiritName,
              csoport: w.spiritCategory,
              kepessegek: w.spiritSkills,
              tamadas: w.spiritAttack,
              fizEro: w.spiritFizEro,
              fizGyo: w.spiritFizGyo,
              fizUgy: w.spiritFizUgy,
              fizKit: w.spiritFizAll,
              asztEro: w.spiritAsztEro,
              asztGyo: w.spiritAsztGyo,
              asztUgy: w.spiritAsztUgy,
              asztKit: w.spiritAsztAll,
            };
          })
        };
      })
      )
      .subscribe((w: any) => {
      this.spiritsList = w.spirits;
      this.spiritsUpdated.next({
        spirits: [...this.spiritsList]
      });
    });
  }

  getSpiritsUpdateListener() {
    return this.spiritsUpdated.asObservable();
  }

  openModal() {
    this.modalServ.openModal(SelectSpiritsComponent, {
      moneyFilter: this.resServ.getSzabadToke(),
      karmaFilter: this.resServ.getSzabadKarma()
    }).subscribe(
      w => this.spiritsServ.addSpirit(w)
    );
  }

}
