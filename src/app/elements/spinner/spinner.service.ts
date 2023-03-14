import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  public setSpinnerStatus:boolean = false;

  spinnerOn() {
    return this.setSpinnerStatus = true;
  }

  spinnerOff() {
    return this.setSpinnerStatus = false;
  }

}
