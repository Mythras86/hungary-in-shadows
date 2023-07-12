import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal.service';
import { Subject, map } from 'rxjs';
import { ResourcesService } from 'src/app/characters/chars-subforms/resources/resources.service';
import { SelectArtifactsComponent } from './select-artifacts.component';
import { ArtifactsService } from 'src/app/characters/chars-subforms/artifacts/artifacts.service';
import { ArtifactsModel } from 'src/app/characters/chars-subforms/artifacts/artifacts.model';

const BACKEND_URL = environment.apiUrl + "/artifact/";

@Injectable({
  providedIn: 'root'
})
export class SelectArtifactService {

    constructor(
      private http: HttpClient,
      private modalServ: ModalService,
      private resServ: ResourcesService,
      private artifactsServ: ArtifactsService,
    ) { }

    public artifactsList: ArtifactsModel[] = [];
    private artifactsUpdated = new Subject<{artifacts: ArtifactsModel[]}>();

    getArtifacts() {
      return this.http
      .get<{ message: string; artifacts: any}>(BACKEND_URL + "list")
      .pipe(
        map(w => {
          return {
            artifacts: (w as any).artifacts.map((w: any) => {
              return {
                _id: w._id,
                nev: w.artifactName,
                csoport: w.artifactCategory,
                maxSzint: w.artifactMaxLevel,
                ar: w.artifactPrice,
                karma: w.artifactKarmaCost,
                megjegyzes: w.artifactDesc,
              };
            })
          };
        })
        )
        .subscribe((w: any) => {
        this.artifactsList = w.artifacts;
        this.artifactsUpdated.next({
          artifacts: [...this.artifactsList]
        });
      });
    }

    getArtifactsUpdateListener() {
      return this.artifactsUpdated.asObservable();
    }

    openModal() {
      this.modalServ.openModal(SelectArtifactsComponent, {
        moneyFilter: this.resServ.getFc('elkolthetoToke').value,
        karmaFilter: this.resServ.getFc('elkolthetoKarma').value
      }).subscribe(
        w => this.artifactsServ.addArtifact(
          w[0], w[1], w[2], w[3], w[4], w[5], w[6]
          )
        );
    }

  }
