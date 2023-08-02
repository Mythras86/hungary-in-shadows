import { Injectable } from '@angular/core';
import { ModalService } from '../modal.service';
import { LevelcontrolComponent } from './levelcontrol.component';
import { FormControl } from '@angular/forms';
import { ResourcesService } from 'src/app/characters/chars-subforms/resources/resources.service';
import { AttributesService } from 'src/app/characters/chars-subforms/attributes/attributes.service';

@Injectable({
  providedIn: 'root'
})
export class LevelcontrolService {

  constructor(
    private modalServ: ModalService,
    private resServ: ResourcesService,
    private attrServ: AttributesService,
    ) { }

    buttonAction(
      nev: string,
      megjegyzes: any,
      lepes: number,
      egyseg: string,
      ar: number,
      karma: number,
      esszencia: number,
      forrasErtekUtv: any,
      minErtek: number,
      maxErtek: number,
      ) {
        this.modalServ.openModal(LevelcontrolComponent, {
        nev: nev,
        megjegyzes: megjegyzes,
        lepes: lepes,
        egyseg: egyseg,
        ar: ar,
        karma: karma,
        esszencia: esszencia,
        forrasErtekUtv: forrasErtekUtv,
        minErtek: minErtek,
        maxErtek: maxErtek,
      }).subscribe(
        w => this.updateData(w, ar, karma, esszencia, forrasErtekUtv),
      );
    }

    updateData(w: number, ar: number, karma: number, esszencia: number, forras: FormControl): void[] {
      return [
        // jutalom
        forras.patchValue(forras.value + w),
        // kifizetés
        this.resServ.fizetesTokebol(w*ar),
        this.resServ.fizetesKarmabol(w*karma),
        this.attrServ.fizetesEsszenciabol(w*esszencia),
      ];
    }

}
