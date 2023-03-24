import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  public spinnerStatus:boolean = false;

  toggleSpinner(status: boolean):boolean {
    return this.spinnerStatus = status;
  }

}
