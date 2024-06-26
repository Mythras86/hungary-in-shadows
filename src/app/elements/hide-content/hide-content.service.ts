import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HideService {

  public statusArray: Array<any> = []

  toggleStatus(keyWord: string) {
    const check = this.statusArray.includes(keyWord);
    if (check == false) {
      return this.statusArray.push(keyWord);
    }
    return this.statusArray = [...this.statusArray.filter(x => x !== keyWord)];
  }

  checkStatus(keyWord: string): boolean {
    const check = this.statusArray.includes(keyWord);
    if (check == false) {
      return false;
    }
    return true;
  }

}
