import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CharModel } from '../chars-main/chars-main.model';

const BACKEND_URL = environment.apiUrl + "/char/";

@Injectable({
  providedIn: 'root'
})
export class CharsListService {

  constructor(
    private http: HttpClient,
  ) { }

  public charsList: CharModel[] = [];
  private charsUpdated = new Subject<{chars: CharModel[]}>();

  getChars() {
    return this.http
    .get<{ message: string; chars: any}>(BACKEND_URL + "list")
    .pipe(
      map(w => {
        return {
          chars: w.chars.map((char: CharModel) => {
            return {
              _id: char._id,
              creatorName: char.creatorName,
              creatorId: char.creatorId,
              becenev: char.becenev,
              dns: char.dns,
              anyanyelv: char.anyanyelv,
            };
          })
        };
      })
    )
    .subscribe(w => {
      this.charsList = w.chars;
      this.charsUpdated.next({
        chars: [...this.charsList]
      });
    });
  }

  getCharsUpdateListener() {
    return this.charsUpdated.asObservable();
  }

  deleteOneChar(_id: string) {
    return this.http.delete(BACKEND_URL + _id);
  }


}
