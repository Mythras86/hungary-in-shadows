import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusmonitorService {

  constructor() { }

  getModifiers(value1: number, value2: number): number {
    let bigger = 0;
    if (value1 >= value2) {
      bigger = value1;
    } else {
      bigger = value2;
    }
    if (bigger == 10) {
      return 4;
    }
    if (7 < bigger && bigger <= 9) {
      return 3;
    }
    if (4 < bigger && bigger <= 7) {
      return 2;
    }
    if (2 < bigger && bigger <= 4) {
      return 1;
    }
    return 0;
  }

}
