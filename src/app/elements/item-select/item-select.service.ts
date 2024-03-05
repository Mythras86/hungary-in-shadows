import { NgStyle } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemSelectService {

  constructor() { }

  status: string = '';

  toggleStatus(fcName: string):void {
   if (this.status == '' || this.status !== fcName) {
     this.status = fcName;
   } else {
     this.status = '';
   }

  }

  toggleClass(fcName: string): string {
    if (this.status == fcName) {
      return 'selected';
    }
    return '';
  }

}
