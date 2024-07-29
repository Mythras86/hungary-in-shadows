import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CharModel } from './chars-main.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../authentication/auth.service';
import { AttributesService } from './attributes/attributes.service';
import { DetailsService } from './details/details.service';
import { ItemsService } from './items/items.service';
import { ResourcesService } from './resources/resources.service';
import { SkillsService } from './skills/skills.service';
import { StatusService } from './status/status.service';
import { SpinnerService } from '../elements/spinner/spinner.service';

const BACKEND_URL = environment.apiUrl + "/char/";

@Injectable({
  providedIn: 'root'
})
export class CharsMainService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authS: AuthService,
    private spinS: SpinnerService,
    private fb: FormBuilder,

    private detailsS: DetailsService,
    private resS: ResourcesService,
    private attrS: AttributesService,
    private statusS: StatusService,
    private skillsS: SkillsService,
    private itemsS: ItemsService,
  ) { }

  mainCharForm!: FormGroup;

  createMode: boolean = true;

  filter: string = '';

  setFilter(keyWord: string):void {
    this.filter = keyWord
  }

  createMainForm(): void {
    this.mainCharForm = this.fb.group({
      _id: [''],
      creatorId: this.authS.getUserId(),
    });
    this.detailsS.createDetails();
    this.resS.createResources();
    this.attrS.createAttributes();
    this.statusS.createStatus();
    this.skillsS.createSkills();
    this.itemsS.createItems();
  }

  sendChar() {
    const main = this.mainCharForm;
    const details = this.detailsS.detailsForm;
    const res = this.resS.resourcesForm;
    const attrs = this.attrS.attributesForm;
    const status = this.statusS.statusForm;
    const skills = this.skillsS.skillsForm;
    const items = this.itemsS.itemsForm;
    if (main.invalid
     || details.invalid
     || res.invalid
     || attrs.invalid
    ) {
      console.log('invalid')
      return;
    }
    let charData: CharModel;
    charData = {
      //szöveges
      teljesnev: details.value.teljesnev,
      becenev: details.value.becenev,
      alnev: details.value.alnev,
      testalkat: details.value.testalkat,
      hajstilus: details.value.hajstilus,
      //értékválasztó
      nem: details.value.nem,
      dns: details.value.dns,
      anyanyelv: details.value.anyanyelv,
      eletkor: details.value.eletkor,
      magassag: details.value.magassag,
      testsuly: details.value.testsuly,
      //szín
      szemszin: details.value.szemszin,
      hajszin: details.value.hajszin,
      szorszin: details.value.szorszin,
      borszin: details.value.borszin,
      kedvencszin: details.value.kedvencszin,
      //hosszú szöveg
      felelem: details.value.felelem,
      osztonzo: details.value.osztonzo,
      gyulolet: details.value.gyulolet,
      kedvenc: details.value.kedvenc,
      irtozat: details.value.irtozat,
      vonzalom: details.value.vonzalom,
      megjelenes: details.value.megjelenes,
      //erőforrások
      alapKarma: res.value.alapKarma,
      szerzettKarma: res.value.szerzettKarma,
      elkoltottKarma: res.value.elkoltottKarma,
      alapToke: res.value.alapToke,
      szerzettToke: res.value.szerzettToke,
      elkoltottToke: res.value.elkoltottToke,
      //fizikai
      fizEro: attrs.value.fizEro,
      fizGyo: attrs.value.fizGyo,
      fizUgy: attrs.value.fizUgy,
      fizKit: attrs.value.fizKit,
      fizEroMod: attrs.value.fizEroMod,
      fizGyoMod: attrs.value.fizGyoMod,
      fizUgyMod: attrs.value.fizUgyMod,
      fizKitMod: attrs.value.fizKitMod,
      //asztrál
      asztEro: attrs.value.asztEro,
      asztGyo: attrs.value.asztGyo,
      asztUgy: attrs.value.asztUgy,
      asztKit: attrs.value.asztKit,
      asztEroMod: attrs.value.asztEroMod,
      asztGyoMod: attrs.value.asztGyoMod,
      asztUgyMod: attrs.value.asztUgyMod,
      asztKitMod: attrs.value.asztKitMod,
      //speciális
      kockatartalek: attrs.value.kockatartalek,
      magia: attrs.value.magia,
      chiAramlas: attrs.value.chiAramlas,
      kockatartalekMod: attrs.value.kockatartalekMod,
      magiaMod: attrs.value.magiaMod,
      chiAramlasMod: attrs.value.chiAramlasMod,
      //konstans
      esszencia: attrs.value.esszencia,
      reakcio: attrs.value.reakcio,
      kezdemenyezes: attrs.value.kezdemenyezes,
      esszenciaMod: attrs.value.esszenciaMod,
      reakcioMod: attrs.value.reakcioMod,
      kezdemenyezesMod: attrs.value.kezdemenyezesMod,
      // állapot
      asztralisAllapot: status.value.asztralisAllapot,
      fizikaiAllapot: status.value.fizikaiAllapot,
      pinhentsegAllapot: status.value.pinhentsegAllapot,
      taplaltsagAllapot: status.value.taplaltsagAllapot,
      // szakértelmek
      activeSkills: skills.value.activeSkills,
      knowledgeSkills: skills.value.knowledgeSkills,
      languageSkills: skills.value.languageSkills,
      // eszközök
      armors: items.value.armors,
      armorAddons: items.value.armorAddons,
      weapons: items.value.weapons,
      weaponAddons: items.value.weaponAddons,
      items: items.value.items,
      cybers: items.value.cybers,
      explosives: items.value.explosives,
      artifacts: items.value.artifacts,
      spells: items.value.spells,
      spirits: items.value.spirits,
    };
    this.spinS.toggleSpinner(true);
    if (this.createMode) {
        this.addOneChar(charData);
    } else {
        this.updateOneChar(charData)
    };
    this.router.navigate(["/charslist"]);
  }

  updateMainForm(w: any): void {
    this.mainCharForm = this.fb.group ({
      _id: w._id,
      creatorId: w.creatorId
    });
  }

  getOneChar(_id: string) {
    return this.http.get<CharModel>(BACKEND_URL +_id);
  }

  addOneChar(charData: CharModel) {
    const withCreator = Object.defineProperty(charData, "creatorId", {value: this.authS.getUserId(), enumerable: true});
    this.http.post(BACKEND_URL + "new", withCreator).subscribe(response => {
      this.router.navigate(["/charslist"]);
    });
  }

  updateOneChar(charData: CharModel) {
      this.http
      .patch(BACKEND_URL +this.mainCharForm.get('_id')?.value, charData)
      .subscribe(response => {
        this.router.navigate(["/charslist"]);
      }
    );
  }

}
