import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    public charsListServ: CharsListService,
    private authServ: AuthService,
    private router: Router,
    public spinServ: SpinnerService,
    public select: ItemSelectService
  ) {}

  userIsAuthenticated = false;
  _id: string = '';
  private authStatusSub!: Subscription;
  private charSub!: Subscription;
  public charsList: CharModel[] = [];

  onNewChar() {
    (<any>this.router).navigate(["/newchar"]);
  }

  onUpdateChar(_id:string) {
    (<any>this.router).navigate(["/editchar/"+_id]);
  }

  onDeleteChar(_id:string) {
    this.charsListServ.deleteOneChar(_id).subscribe(() => {
      this.charsListServ.getChars();
    });
  }

  getCsoport(creatorId: string): string {
    if (creatorId === this._id) {
      return 'Saját karakterek';
    }
    return 'Más karakterek';
  }

  ngOnInit():void {
    this.spinServ.toggleSpinner(false);
    this.charsListServ.getChars();
    this._id = this.authServ.getUserId();
    this.userIsAuthenticated = this.authServ.getIsAuth();
    this.authStatusSub = this.authServ
      .getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
      this.userIsAuthenticated = isAuthenticated;
      this._id = this.authServ.getUserId();
      });
    this.charSub = this.charsListServ.getCharsUpdateListener()
      .subscribe((w: {chars:CharModel[]}) => {
        this.spinServ.toggleSpinner(false);
        this.charsList = w.chars;
      });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.charSub.unsubscribe();
  }

}
