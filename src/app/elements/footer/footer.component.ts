import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }

  public userIsAuthenticated = false;
  private authListenerSubs!: Subscription;

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
