import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/users/auth.service';
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

  userIsAuthenticated = false;
  userId!: string;
  private authStatusSub!: Subscription;

  getCharsList():Array<any> | null {
    return this.charServ.charsList;
  }

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
    this.userIsAuthenticated = this.authServ.getIsAuth();
    this.authStatusSub = this.authServ
    .getAuthStatusListener()
    .subscribe((isAuthenticated: boolean) => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authServ.getUserId();
    });
    this.charServ.getChars().subscribe({
      next: (w) => {
        this.charServ.charsList = w;
      }
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
