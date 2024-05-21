import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/authentication/auth.service';
import { SpinnerService } from 'src/app/elements/spinner/spinner.service';
import { HideService } from 'src/app/elements/hide-content/hide-content.service';

import { CharsMainService } from './chars-main.service';
import { DetailsService } from '../chars-subforms/details/details.service';
import { ResourcesService } from '../chars-subforms/resources/resources.service';
import { AttributesService } from '../chars-subforms/attributes/attributes.service';
import { StatusService } from '../chars-subforms/status/status.service';
import { SkillsService } from '../chars-subforms/skills/skills.service';
import { ItemsService } from '../chars-subforms/items/items.service';
import { CharsListService } from '../chars-list/chars-list.service';

@Component({
  selector: 'app-chars-main',
  templateUrl: './chars-main.component.html',
  styleUrls: ['./chars-main.component.css'],
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

  mode:string = 'create';
  _id:string = '';
  filter: string = 'Nincs';

  userIsAuthenticated = false;
  userId: string = '';
  private authStatusSub!: Subscription;

  createFilter(): any {
    const savedFilter = localStorage.getItem('mainCharFilter');
    if (!savedFilter) {
      return localStorage.setItem('mainCharFilter', this.filter);
    }
    return this.filter = savedFilter;
  }

  setFilter(keyWord: string):void {
    localStorage.setItem('mainCharFilter', keyWord);
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
   if (this.mode === 'create') {
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
        attrs.value.chi,
        attrs.value.cyberCapacity,
        // konstans
        attrs.value.esszencia,
        // állapot
        status.value.asztralisAllapot,
        status.value.fizikaiAllapot,
        status.value.pinhentsegAllapot,
        status.value.taplaltsagAllapot,
        // arrayok
        skills.value.skills,
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
        attrs.value.chi,
        attrs.value.cyberCapacity,
        // konstans
        attrs.value.esszencia,
        // állapot
        status.value.asztralisAllapot,
        status.value.fizikaiAllapot,
        status.value.pinhentsegAllapot,
        status.value.taplaltsagAllapot,
        // arrayok
        skills.value.skills,
        items.value.items
      )
    };
    this.router.navigate(["/charslist"]);
  }

  backToList() {
    this.router.navigate(["/charslist"]);
  }

  ngOnInit(): void {
    this.createFilter();
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
        this.mode = 'edit';
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
        this.mode = 'create';
        this._id = '';
        this.s.createMainForm();
        this.skillsS.addFirstLanguage()
      }
    });
  }

  ngOnDestroy(): void {
      this.authStatusSub.unsubscribe();
  }

}
