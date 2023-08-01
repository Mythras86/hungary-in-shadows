import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal.service';
import { Subject, map } from 'rxjs';
import { ResourcesService } from 'src/app/characters/chars-subforms/resources/resources.service';
import { SelectSpellsComponent } from './select-spells.component';
import { SpellsService } from 'src/app/characters/chars-subforms/spells/spells.service';
import { SpellsModel } from 'src/app/characters/chars-subforms/spells/spells.model';

const BACKEND_URL = environment.apiUrl + "/spell/";

@Injectable({
  providedIn: 'root'
})
export class SelectSpellService {

    constructor(
      private http: HttpClient,
      private modalServ: ModalService,
      private resServ: ResourcesService,
      private spellsServ: SpellsService,
    ) { }

    public spellsList: SpellsModel[] = [];
    private spellsUpdated = new Subject<{spells: SpellsModel[]}>();

    getSpells() {
      return this.http
      .get<{ message: string; spells: any}>(BACKEND_URL + "list")
      .pipe(
        map(w => {
          return {
            spells: (w as any).spells.map((w: any) => {
              return {
                _id: w._id,
                nev: w.spellName,
                csoport: w.spellCategory,
                tipus: w.spellType,
                celpontok: w.spellTarget,
                hatotav: w.spellRange,
                celszam: w.spellTargetNum,
                hatoido: w.spellDuration,
                kifaradas: w.spellFatigue,
                megjegyzes: w.spellDesc,
              };
            })
          };
        })
        )
        .subscribe((w: any) => {
        this.spellsList = w.spells;
        this.spellsUpdated.next({
          spells: [...this.spellsList]
        });
      });
    }

    getSpellsUpdateListener() {
      return this.spellsUpdated.asObservable();
    }

    openModal() {
      this.modalServ.openModal(SelectSpellsComponent, {
        moneyFilter: this.resServ.getFc('elkolthetoToke').value,
        karmaFilter: this.resServ.getFc('elkolthetoKarma').value
      }).subscribe(
        w => this.spellsServ.addSpell(w)
      );
    }

  }
