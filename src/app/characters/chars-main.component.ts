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
   this.spinS.toggleSpinner(true);
   if (this.createMode) {
      this.s.addOneChar(
        //szöveges
        details.value.teljesnev,
        details.value.becenev,
        details.value.alnev,
        details.value.testalkat,
        details.value.hajstilus,
        //értékválasztó
        details.value.nem,
        details.value.dns,
        details.value.anyanyelv,
        details.value.eletkor,
        details.value.magassag,
        details.value.testsuly,
        //szín
        details.value.szemszin,
        details.value.hajszin,
        details.value.szorszin,
        details.value.borszin,
        details.value.kedvencszin,
        //hosszú szöveg
        details.value.felelem,
        details.value.osztonzo,
        details.value.gyulolet,
        details.value.kedvenc,
        details.value.irtozat,
        details.value.vonzalom,
        details.value.megjelenes,
        //erőforrások
        res.value.alapKarma,
        res.value.szerzettKarma,
        res.value.elkoltottKarma,
        res.value.alapToke,
        res.value.szerzettToke,
        res.value.elkoltottToke,
        //fizikai
        attrs.value.fizEro,
        attrs.value.fizGyo,
        attrs.value.fizUgy,
        attrs.value.fizKit,
        //asztrál
        attrs.value.asztEro,
        attrs.value.asztGyo,
        attrs.value.asztUgy,
        attrs.value.asztKit,
        //speciális
        attrs.value.kockatartalek,
        attrs.value.magia,
        attrs.value.chiAramlas,
        // konstans
        attrs.value.esszencia,
        attrs.value.reakcio,
        attrs.value.kezdemenyezes,
        // állapot
        status.value.asztralisAllapot,
        status.value.fizikaiAllapot,
        status.value.pinhentsegAllapot,
        status.value.taplaltsagAllapot,
        // arrayok
        skills.value.activeSkills,
        skills.value.knowledgeSkills,
        skills.value.languageSkills,
        items.value.items
      );
   } else {
      this.s.updateOneChar(
        //szöveges
        details.value.teljesnev,
        details.value.becenev,
        details.value.alnev,
        details.value.testalkat,
        details.value.hajstilus,
        //értékválasztó
        details.value.nem,
        details.value.dns,
        details.value.anyanyelv,
        details.value.eletkor,
        details.value.magassag,
        details.value.testsuly,
        //szín
        details.value.szemszin,
        details.value.hajszin,
        details.value.szorszin,
        details.value.borszin,
        details.value.kedvencszin,
        //hosszú szöveg
        details.value.felelem,
        details.value.osztonzo,
        details.value.gyulolet,
        details.value.kedvenc,
        details.value.irtozat,
        details.value.vonzalom,
        details.value.megjelenes,
        //erőforrások
        res.value.alapKarma,
        res.value.szerzettKarma,
        res.value.elkoltottKarma,
        res.value.alapToke,
        res.value.szerzettToke,
        res.value.elkoltottToke,
        //fizikai
        attrs.value.fizEro,
        attrs.value.fizGyo,
        attrs.value.fizUgy,
        attrs.value.fizKit,
        //asztrál
        attrs.value.asztEro,
        attrs.value.asztGyo,
        attrs.value.asztUgy,
        attrs.value.asztKit,
        //speciális
        attrs.value.kockatartalek,
        attrs.value.magia,
        attrs.value.chiAramlas,
        // konstans
        attrs.value.esszencia,
        attrs.value.reakcio,
        attrs.value.kezdemenyezes,
        // állapot
        status.value.asztralisAllapot,
        status.value.fizikaiAllapot,
        status.value.pinhentsegAllapot,
        status.value.taplaltsagAllapot,
        // arrayok
        skills.value.activeSkills,
        skills.value.knowledgeSkills,
        skills.value.languageSkills,
        items.value.items
      )
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
          this.skillsS.updateSkills(w.activeSkills, w.knowledgeSkills, w.languageSkills);
          this.itemsS.updateItems(w.armors);
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
