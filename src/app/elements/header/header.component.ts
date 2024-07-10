import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { DetailsService } from 'src/app/characters/details/details.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private detailsS: DetailsService,
    private route: ActivatedRoute
    ) { }

  menuOn: boolean = false;
  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;

  toggleMenu(): void {
    this.menuOn = !this.menuOn;
  }

  name() {
    return this.authService.getUserName();
  }

  _id() {
    return this.authService.getUserId();
  }

  getAName() {
    return 'Üdv újra itt '+this.name()+'!';
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
