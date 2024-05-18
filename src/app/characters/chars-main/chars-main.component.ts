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

@Component({
  selector: 'app-chars-main',
  templateUrl: './chars-main.component.html',
  styleUrls: ['./chars-main.component.css'],
  providers: [HideService]

})
export class CharsMainComponent implements OnInit, OnDestroy {

  constructor (
    public charServ: CharsMainService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public authServ: AuthService,
    public spinServ: SpinnerService,
    public hideServ: HideService,

    public attrServ: AttributesService,
    public detailsServ: DetailsService,
    public resServ: ResourcesService,
    public statusServ: StatusService,
    public skillsServ: SkillsService,
    public itemsServ: ItemsService,
  ) {}

  mode:string = 'create';
  _idForFilter:string = '';
  filter: string = 'Nincs';

  userIsAuthenticated = false;
  _id: string = '';
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

  createMainForm(): void {
    this.charServ.mainCharForm = this.fb.group({
      _id: [''],
      creatorName: this.authServ.getUserName(),
      creatorId: this.authServ.getUserId(),
    });
    this.detailsServ.createDetails();
    this.resServ.createResources();
    this.attrServ.createAttributes();
    this.statusServ.createStatus();
    this.skillsServ.createSkills();
    this.itemsServ.createItems();
  }

  getCreatorId():string {
    return this.charServ.mainCharForm.get('creatorId')?.value;
  }

  createNewChar() {
    const main = this.charServ.mainCharForm;
    const details = this.detailsServ.detailsForm;
    const res = this.resServ.resourcesForm;
    const attrs = this.attrServ.attributesForm;
    const skills = this.skillsServ.skillsForm;
    const status = this.statusServ.statusForm;
    const items = this.itemsServ.itemsForm;
    if (main.invalid
     || details.invalid
     || res.invalid
     || attrs.invalid
    ) {
      console.log('invalid')
      return;
   }
   this.spinServ.toggleSpinner(true);
   if (this.mode === 'create') {
      this.charServ.addOneChar(
        main.value.creatorId,
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
      this.charServ.updateOneChar(
        main.value._id,
        main.value.creatorId,
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
      )};
    this.router.navigate(["/charslist"]);
  }

  backToList() {
    this.router.navigate(["/charslist"]);
  }

  ngOnInit(): void {
    this.createFilter();
    this.spinServ.toggleSpinner(false);
    this._id = this.authServ.getUserId();
    this.userIsAuthenticated = this.authServ.getIsAuth();
    this.authStatusSub = this.authServ
    .getAuthStatusListener()
    .subscribe((isAuthenticated: boolean) => {
      this.userIsAuthenticated = isAuthenticated;
      this._id = this.authServ.getUserId();
      this.spinServ.toggleSpinner(true);
    });
    this.spinServ.toggleSpinner(false);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('_id')) {
        this.mode = 'edit';
        this._id = paramMap.get('_id')!;
        this.spinServ.toggleSpinner(true);
        this.charServ.getOneChar(this._id).subscribe(w => {
          this.spinServ.toggleSpinner(false);
          this.charServ.mainCharForm= this.fb.group ({
            _id: w._id,
            creatorId: w.creatorId
          });
          this.detailsServ.updateDetails(w);
          this.resServ.updateResources(w);
          this.attrServ.updateAttributes(w);
          this.statusServ.updateStatus(w);

        });
      } else {
        this.mode = 'create';
        this._id = '';
        this.createMainForm();
        this.skillsServ.addFirstLanguage()
      }
    });
  }

  ngOnDestroy(): void {
      this.authStatusSub.unsubscribe();
  }

}
