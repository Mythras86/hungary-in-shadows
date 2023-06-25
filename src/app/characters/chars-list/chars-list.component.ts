import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { SpinnerService } from 'src/app/elements/spinner/spinner.service';
import { CharsListService } from './chars-list.service';

@Component({
  selector: 'app-chars',
  templateUrl: './chars-list.component.html',
  styleUrls: ['./chars-list.component.css']
})
export class CharsListComponent implements OnInit, OnDestroy {

  constructor(
    public charsListServ: CharsListService,
    private authServ: AuthService,
    private router: Router,
    public spinServ: SpinnerService
  ) {}

  userIsAuthenticated = false;
  userId: string = '';
  private authStatusSub!: Subscription;
  private charSub!: Subscription;

  onNewChar() {
    (<any>this.router).navigate(["/charsheet"]);
  }

  onUpdateChar(_id:string) {
    (<any>this.router).navigate(["/editchar/"+_id]);
  }

  onDeleteChar(_id:string) {
    this.charsListServ.deleteOneChar(_id).subscribe(() => {
      this.charsListServ.getChars();
    });
  }

  ngOnInit():void {
    this.spinServ.toggleSpinner(false);
    this.userId = this.authServ.getUserId();
    this.charsListServ.getChars();
    this.userIsAuthenticated = this.authServ.getIsAuth();
    this.authStatusSub = this.authServ
    .getAuthStatusListener()
    .subscribe((isAuthenticated: boolean) => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authServ.getUserId();
    });
    this.charSub = this.charsListServ.getCharsUpdateListener()
    .subscribe(w => {
        this.charsListServ.charsList = w.chars;
        this.spinServ.toggleSpinner(false);
      }
    )
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.charSub.unsubscribe();
  }

}
