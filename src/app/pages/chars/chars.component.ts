import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/users/auth.service';
import { CharModel } from './chars.model';
import { CharsService } from './chars.service';

@Component({
  selector: 'app-chars',
  templateUrl: './chars.component.html',
  styleUrls: ['./chars.component.css']
})
export class CharsComponent implements OnInit, OnDestroy {

  constructor(
    public charServ: CharsService,
    private authServ: AuthService,
    private router: Router,
  ) {}

  charsList: CharModel[] = []
  userIsAuthenticated = false;
  userId!: string;
  private authStatusSub!: Subscription;
  private charSub!: Subscription;

  onNewChar() {
    (<any>this.router).navigate(["/newchar"]);
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
      }
    )
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.charSub.unsubscribe();
  }

}
