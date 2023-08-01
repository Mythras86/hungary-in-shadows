import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortMeService {

  constructor() { }

  sortByString(array: Array<any>, field: string) {
    array.sort((a, b) => {
      const nameA = a[field].toUpperCase();
      const nameB = b[field].toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  sortByValue(array: Array<any>, field: string) {
    array.sort((a, b) => a[field] - b[field]);
  }

}
