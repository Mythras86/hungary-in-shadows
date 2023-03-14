import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { SpinnerService } from 'src/app/elements/spinner/spinner.service';
import { CharModel } from '../chars-main/chars-main.model';
import { CharsMainService } from '../chars-main/chars-main.service';

@Component({
  selector: 'app-chars',
  templateUrl: './chars-list.component.html',
  styleUrls: ['./chars-list.component.css']
})
export class CharsListComponent implements OnInit, OnDestroy {

  constructor(
    public charServ: CharsMainService,
    private authServ: AuthService,
    private router: Router,
    public spinServ: SpinnerService
  ) {}

  charsList: CharModel[] = []
  userIsAuthenticated = false;
  userId!: string;
  private authStatusSub!: Subscription;
  private charSub!: Subscription;

  onNewChar() {
    (<any>this.router).navigate(["/charsheet"]);
  }

  onUpdateChar(_id:string) {
    (<any>this.router).navigate(["/editchar/"+_id]);
  }

  onDeleteChar(_id:string) {
    this.charServ.deleteOneChar(_id).subscribe(() => {
      this.charServ.getChars();
    });
  }

  ngOnInit():void {
    this.spinServ.spinnerOn();
    this.userId = this.authServ.getUserId();
    this.charServ.getChars();
    this.userIsAuthenticated = this.authServ.getIsAuth();
    this.authStatusSub = this.authServ
    .getAuthStatusListener()
    .subscribe((isAuthenticated: boolean) => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authServ.getUserId();
    });
    this.charSub = this.charServ.getCharsUpdateListener()
    .subscribe(w => {
        this.charsList = w.chars;
        this.spinServ.spinnerOff();
      }
    )
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.charSub.unsubscribe();
  }

}
