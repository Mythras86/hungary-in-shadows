import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, Subject } from 'rxjs';
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

  charsList: Array<any> = [];

  getChars(): Observable<CharModel[]> {
    return this.http.get<CharModel[]>(BACKEND_URL + "list")
  }

  deleteOneChar(_id: string) {
    return this.http.delete(BACKEND_URL + _id);
  }


}
