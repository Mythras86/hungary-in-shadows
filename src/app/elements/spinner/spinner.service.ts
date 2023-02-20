import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private isLoading:boolean = false;

  constructor() {}

  setLoading(newStatus: boolean) {
    this.isLoading = newStatus;
  }

  getLoading() {
    return this.isLoading;
  }

}
