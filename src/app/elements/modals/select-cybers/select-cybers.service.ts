import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal.service';
import { CybersModel } from 'src/app/characters/chars-subforms/cybers/cybers.model';
import { Subject, map } from 'rxjs';
import { ResourcesService } from 'src/app/characters/chars-subforms/resources/resources.service';
import { SelectCybersComponent } from './select-cybers.component';
import { CybersService } from 'src/app/characters/chars-subforms/cybers/cybers.service';
import { AttributesService } from 'src/app/characters/chars-subforms/attributes/attributes.service';

const BACKEND_URL = environment.apiUrl + "/cyber/";

@Injectable({
  providedIn: 'root'
})
export class SelectCyberService {

    constructor(
      private http: HttpClient,
      private modalServ: ModalService,
      private resServ: ResourcesService,
      private attrServ: AttributesService,
      private cybersServ: CybersService,
    ) { }

    public cybersList: CybersModel[] = [];
    private cybersUpdated = new Subject<{cybers: CybersModel[]}>();

    getCybers() {
      return this.http
      .get<{ message: string; cybers: any}>(BACKEND_URL + "list")
      .pipe(
        map(w => {
          return {
            cybers: (w as any).cybernetics.map((w: any) => {
              return {
                _id: w._id,
                nev: w.cyberneticName,
                csoport: w.cyberneticCategory,
                szint: w.cyberneticMaxLevel,
                ar: w.cyberneticPrice,
                esszencia: w.cyberneticEssence,
                megjegyzes: w.cyberneticDesc,
              };
            })
          };
        })
        )
        .subscribe((w: any) => {
        this.cybersList = w.cybers;
        this.cybersUpdated.next({
          cybers: [...this.cybersList]
        });
      });
    }

    getCybersUpdateListener() {
      return this.cybersUpdated.asObservable();
    }

    openModal() {
      this.modalServ.openModal(SelectCybersComponent, {
        moneyFilter: this.resServ.getFc('elkolthetoToke').value,
        essenceFilter: this.attrServ.getFc('esszencia').value
      }).subscribe(
        w => this.cybersServ.addCyber(
          w[0], w[1], w[2], w[3], w[4], w[5], w[6]
          )
        );
    }

  }
