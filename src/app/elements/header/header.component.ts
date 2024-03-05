import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { DetailsService } from 'src/app/characters/chars-subforms/details/details.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private detailsS: DetailsService,
    private route: ActivatedRoute
    ) { }

  public userIsAuthenticated = false;
  private authListenerSubs!: Subscription;

  userName() {
    return this.authService.getUserName();
  }

  userId() {
    return this.authService.getUserId();
  }

  getAName() {
    if (
      this.detailsS.detailsForm
      && this.detailsS.getFc('becenev').value !==''
      ) {
      return this.detailsS.getFc('becenev').value;
    }
    return 'Üdv újra itt '+this.userName()+'!';
  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
