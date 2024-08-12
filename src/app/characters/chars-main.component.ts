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

  _id:string = '';

  userIsAuthenticated = false;
  userId: string = '';
  private authStatusSub!: Subscription;

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
        this.s.createMode = false;
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
          this.itemsS.updateItems(w.items);
        });
      } else {
        this.s.createMode = true;
        this._id = '';
        this.s.createMainForm();
      }
    });
  }

  ngOnDestroy(): void {
      this.authStatusSub.unsubscribe();
  }

}
