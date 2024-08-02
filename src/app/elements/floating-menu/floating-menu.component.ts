import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modals/modal.service';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CharsMainService } from 'src/app/characters/chars-main.service';
import { AuthService } from 'src/app/authentication/auth.service';
import { SpinnerService } from '../spinner/spinner.service';
import { ResourcesService } from 'src/app/characters/resources/resources.service';
import { ItemSelectService } from '../item-select/item-select.service';
import { SkillsService } from 'src/app/characters/skills/skills.service';
import { ItemsService } from 'src/app/characters/items/items.service';
import { HideService } from '../hide-content/hide-content.service';

@Component({
  selector: 'app-floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.scss']
})
export class FloatingMenuComponent implements OnInit {

  constructor(
    private authS: AuthService,
    private router: Router,
    private spinS: SpinnerService,

    public mainS: CharsMainService,
    public resS: ResourcesService,
    public skillsS: SkillsService,
    public itemsS: ItemsService,
    public hide: HideService,

  ) {}

  menuOpen: boolean = false;

  openMenu(): void {
    this.menuOpen = true;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  userIsAuthenticated = false;
  userId: string = '';
  private authStatusSub!: Subscription;

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;


  backToList() {
    this.router.navigate(["/charslist"]);
  }

  getCreatorId():string {
    return this.mainS.mainCharForm.get('creatorId')?.value;
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

  }
}
