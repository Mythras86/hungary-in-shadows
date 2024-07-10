import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { SpinnerService } from 'src/app/elements/spinner/spinner.service';
import { CharsListService } from './chars-list.service';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';
import { CharModel } from '../chars-main.model';

@Component({
  selector: 'app-chars',
  templateUrl: './chars-list.component.html',
  styleUrls: ['./chars-list.component.scss']
})
export class CharsListComponent implements OnInit, OnDestroy {

  constructor(
    public s: CharsListService,
    private authS: AuthService,
    public spinS: SpinnerService,
    public select: ItemSelectService
  ) {}

  userIsAuthenticated = false;
  userId: string  = '';
  private authStatusSub!: Subscription;

  public charsList: Array<CharModel> = [];
  private charsListUpd = new BehaviorSubject<CharModel[]>([])

  getCharsList(): void {
    if (this.userIsAuthenticated == true) {
      this.s.getCharsList().subscribe({
        next: (w: CharModel[]) => {
          this.charsList = w;
          this.charsListUpd.next([...this.charsList]);
          this.spinS.toggleSpinner(false);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    this.spinS.toggleSpinner(false);
    return;
  }

  getCsoport(creatorId: string): string {
    if (creatorId === this.userId) {
      return 'Saját karakterek';
    }
    return 'Más karakterek';
  }

  deleteChar(_id:string): void {
    this.spinS.toggleSpinner(true);
    this.s.deleteChar(_id).subscribe({
      next: response => {
        this.charsList = this.charsList.filter(w => w._id !== _id);
        this.spinS.toggleSpinner(false);
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  ngOnInit():void {
    this.spinS.toggleSpinner(true);
    this.userId = this.authS.getUserId();
    this.userIsAuthenticated = this.authS.getIsAuth();
    this.authStatusSub = this.authS
    .getAuthStatusListener()
    .subscribe((isAuthenticated: boolean) => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authS.getUserId();
    });
    this.getCharsList();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
