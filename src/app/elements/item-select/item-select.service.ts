import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemSelectService {

  constructor() { }

  status: string = '';

  toggleStatus(key: string):void {
   if (this.status == '' || this.status !== key) {
     this.status = key;
   } else {
     this.status = '';
   }

  }

  toggleClass(key: string): string {
    if (this.status == key) {
      return 'selected';
    }
    return '';
  }

  clearSelected() {
    this.status = '';
  }

}
