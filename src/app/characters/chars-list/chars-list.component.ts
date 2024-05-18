import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { SpinnerService } from 'src/app/elements/spinner/spinner.service';
import { CharsListService } from './chars-list.service';
import { CharModel } from '../chars-main/chars-main.model';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';

@Component({
  selector: 'app-chars',
  templateUrl: './chars-list.component.html',
  styleUrls: ['./chars-list.component.css']
})
export class CharsListComponent implements OnInit, OnDestroy {

  constructor(
    public s: CharsListService,
    private authServ: AuthService,
    private router: Router,
    public spinServ: SpinnerService,
    public select: ItemSelectService
  ) {}

  userIsAuthenticated = false;
  userId: string  = '';
  private authStatusSub!: Subscription;

  onNewChar() {
    (<any>this.router).navigate(["/newchar"]);
  }

  // onUpdateChar(_id:string) {
  //   (<any>this.router).navigate(["/editchar/"+_id]);
  // }

  // onDeleteChar(_id:string) {
  //   this.charsListServ.deleteOneChar(_id).subscribe(() => {
  //     this.charsListServ.getChars();
  //   });
  // }

  getCharsList():any {
    if (this.s.charsList.length == 0) {
      this.s.getChars().subscribe({
        next: (chars: CharModel[]) => {
          this.s.charsList = chars;
        },
        error: (error) => {
          console.log(error)
        }
      });
      return
    }
  }

  getCsoport(creatorId: string): string {
    if (creatorId === this.userId) {
      return 'Saját karakterek';
    }
    return 'Más karakterek';
  }

  ngOnInit():void {
    this.spinServ.toggleSpinner(false);
    this.userId = this.authServ.getUserId();
    this.userIsAuthenticated = this.authServ.getIsAuth();
    this.authStatusSub = this.authServ
    .getAuthStatusListener()
    .subscribe((isAuthenticated: boolean) => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authServ.getUserId();
    });
    this.getCharsList();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
