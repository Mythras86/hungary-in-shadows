import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CharModel } from '../chars-main.model';
import { Observable } from 'rxjs';

const BACKEND_URL = environment.apiUrl + "/char/";

@Injectable({
  providedIn: 'root'
})
export class CharsListService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  newChar() {
    (<any>this.router).navigate(["/newchar"]);
  }

  updateChar(_id:string) {
    (<any>this.router).navigate(["/editchar/"+_id]);
  }

  deleteChar(_id: string) {
    return this.http.delete(BACKEND_URL + _id);
  }

  getCharsList(): Observable<CharModel[]> {
    const chars = this.http.get<CharModel[]>(BACKEND_URL + "list");
    return chars;
  }


}
