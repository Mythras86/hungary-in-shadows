import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class HideService {

  public statusArray: Array<any> = []
  public status: boolean = false;

  toggleStatus(keyWord: string): void {
    const check = this.statusArray.includes(keyWord);
    if (check == false) {
      this.statusArray.push(keyWord);
      this.checkStatus(keyWord);
    } else {
      this.statusArray = [...this.statusArray.filter(x => x !== keyWord)];
      this.checkStatus(keyWord);
    }
  }

  checkStatus(keyWord: string): boolean {
    const check = this.statusArray.includes(keyWord);
    if (check == false) {
      return this.status = false;
    } else {
      return this.status = true;
    }
  }

  clearStatus(): void {
    this.statusArray.length = 0;
    this.status = false;
  }

}
