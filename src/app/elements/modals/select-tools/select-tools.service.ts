import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal.service';
import { Subject, map } from 'rxjs';
import { ResourcesService } from 'src/app/characters/chars-subforms/resources/resources.service';
import { SelectToolsComponent } from './select-tools.component';
import { ToolsService } from 'src/app/characters/chars-subforms/items/tools/tools.service';
import { ToolsModel } from 'src/app/characters/chars-subforms/items/tools/tools.model';

const BACKEND_URL = environment.apiUrl + "/tool/";

@Injectable({
  providedIn: 'root'
})
export class SelectToolService {

    constructor(
      private http: HttpClient,
      private modalServ: ModalService,
      private resServ: ResourcesService,
      private toolsServ: ToolsService,
    ) { }

    public toolsList: ToolsModel[] = [];
    private toolsUpdated = new Subject<{tools: ToolsModel[]}>();

    getTools() {
      return this.http
      .get<{ message: string; tools: any}>(BACKEND_URL + "list")
      .pipe(
        map(w => {
          return {
            tools: (w as any).tools.map((w: any) => {
              return {
                _id: w._id,
                nev: w.equipmentName,
                csoport: w.equipmentCategory,
                maxSzint: w.equipmentMaxLevel,
                suly: w.equipmentWeight,
                ar: w.equipmentPrice,
                megjegyzes: w.equipmentDesc,
              };
            })
          };
        })
        )
        .subscribe((w: any) => {
        this.toolsList = w.tools;
        this.toolsUpdated.next({
          tools: [...this.toolsList]
        });
      });
    }

    getToolsUpdateListener() {
      return this.toolsUpdated.asObservable();
    }

    openModal() {
      this.modalServ.openModal(SelectToolsComponent, {
        moneyFilter: this.resServ.getFc('szabadToke').value,
      }).subscribe(
        w => this.toolsServ.addTool(w));
    }

  }
