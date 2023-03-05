import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/users/auth.service';
import { environment } from 'src/environments/environment';
import { CharModel, CharsDataInterface } from './chars.model';

const BACKEND_URL = environment.apiUrl + "/char/";

@Injectable({
  providedIn: 'root'
})
export class CharsService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authServ: AuthService
    ) { }

    public charsList: CharModel[] = [];
    private charsUpdated = new Subject<{chars: CharModel[]}>();

  getChars() {
    return this.http
    .get<{ message: string; chars: any}>(BACKEND_URL + "list")
    .pipe(
      map(w => {
        return {
          chars: w.chars.map((char: { _id: string; creatorName: string; creatorId: string; nev: string; kaszt: string; }) => {
            return {
              _id: char._id,
              creatorName: char.creatorName,
              creatorId: char.creatorId,
              nev: char.nev,
              kaszt: char.kaszt,
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

  getOneChar(_id: string) {
    return this.http.get<{
      _id: string,
      creatorName: string,
      creatorId: string,
      nev: string,
      kaszt: string
      }>(BACKEND_URL + _id);
  }

  addOneChar(
    _id: string,
    creatorName: string,
    creatorId: string,
    nev: string,
    kaszt: string
  ) {
    const charData: CharModel = {
      _id: '',
      creatorName: '',
      creatorId: '',
      nev: nev,
      kaszt: kaszt,
    };
    this.http.post<{ message: string; char: CharModel }>(
      BACKEND_URL + "create", charData).subscribe(response => {
        this.router.navigate(["/chars"]);
      });
  }

  updateOneChar(
    _id: string,
    creatorName: string,
    creatorId: string,
    nev: string,
    kaszt: string
  ) {
    let charData: CharModel;
    charData = {
      _id: _id,
      creatorId: creatorId,
      creatorName: creatorName,
      nev: nev,
      kaszt: kaszt
    };
      this.http
      .put(BACKEND_URL + _id, charData)
      .subscribe(response => {
        this.router.navigate(["/chars"]);
      });
  }

  deleteOneChar(charId: string) {
    return this.http.delete(BACKEND_URL + charId);
  }


}
