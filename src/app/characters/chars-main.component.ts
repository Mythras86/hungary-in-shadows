import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/authentication/auth.service';
import { SpinnerService } from 'src/app/elements/spinner/spinner.service';
import { HideService } from 'src/app/elements/hide-content/hide-content.service';
import { AttributesService } from './attributes/attributes.service';
import { CharsMainService } from './chars-main.service';
import { DetailsService } from './details/details.service';
import { ItemsService } from './items/items.service';
import { ResourcesService } from './resources/resources.service';
import { SkillsService } from './skills/skills.service';
import { StatusService } from './status/status.service';
import { CharModel } from './chars-main.model';


@Component({
  selector: 'app-chars-main',
  templateUrl: './chars-main.component.html',
  styleUrls: ['./chars-main.component.scss'],
  providers: [HideService]

})
export class CharsMainComponent implements OnInit, OnDestroy {

  constructor (
    public s: CharsMainService,
    private router: Router,
    private route: ActivatedRoute,
    private authS: AuthService,
    private spinS: SpinnerService,

    private attrS: AttributesService,
    private detailsS: DetailsService,
    private resS: ResourcesService,
    private statusS: StatusService,
    private skillsS: SkillsService,
    private itemsS: ItemsService,
  ) {}

  createMode: boolean = true;
  _id:string = '';
  filter: string = 'Nincs';

  userIsAuthenticated = false;
  userId: string = '';
  private authStatusSub!: Subscription;


  setFilter(keyWord: string):void {
    this.filter = keyWord
  }

  getCreatorId():string {
    return this.s.mainCharForm.get('creatorId')?.value;
  }

  sendChar() {
    const main = this.s.mainCharForm;
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
        this.s.addOneChar(charData);
    } else {
        this.s.updateOneChar(charData)
    };
    this.router.navigate(["/charslist"]);
  }

  backToList() {
    this.router.navigate(["/charslist"]);
  }

  ngOnInit(): void {
    this.spinS.toggleSpinner(false);
    this.userId = this.authS.getUserId();
    this.userIsAuthenticated = this.authS.getIsAuth();
    this.authStatusSub = this.authS
    .getAuthStatusListener()
    .subscribe((isAuthenticated: boolean) => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authS.getUserId();
      this.spinS.toggleSpinner(true);
    });
    this.spinS.toggleSpinner(false);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('_id')) {
        this.createMode = false;
        this._id = paramMap.get('_id')!;
        this.spinS.toggleSpinner(true);
        this.s.getOneChar(this._id).subscribe(w => {
          this.spinS.toggleSpinner(false);
          this.s.updateMainForm(w);
          this.detailsS.updateDetails(w);
          this.resS.updateResources(w);
          this.attrS.updateAttributes(w);
          this.statusS.updateStatus(w);
          this.skillsS.updateSkills(w);
          this.itemsS.updateItems(w);
        });
      } else {
        this.createMode = true;
        this._id = '';
        this.s.createMainForm();
      }
    });
  }

  ngOnDestroy(): void {
      this.authStatusSub.unsubscribe();
  }

}
