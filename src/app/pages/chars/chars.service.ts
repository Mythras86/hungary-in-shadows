import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, Subject, tap } from 'rxjs';
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
    ) { }

    public charsList: CharModel[] = [];

  getChars(): Observable<CharModel[]> {
    return this.http
    .get<{ message: string; chars: any}>(BACKEND_URL + "list")
    .pipe(
      map(this.processCharsData),
      tap(this.setCharsList.bind(this))
    );
  }

  private processCharsData(charsData: CharsDataInterface) {
    return charsData.chars.map((w) => {
      return {
        _id: w._id,
        creatorName: w.creatorName,
        creatorID: w.creatorID,
        nev: w.nev,
        kaszt: w.kaszt,
     } as CharModel
    });
  }

  private setCharsList(charsList: CharModel[]) {
    this.charsList = charsList;
  }



  getOneChar(_id: string) {
    return this.http.get<{
      _id: string,
      creatorName: string,
      creatorID: string,
      nev: string,
      kaszt: string
      }>(BACKEND_URL + _id);
  }

  addOneChar(
    _id: string,
    creatorName: string,
    creatorID: string,
    nev: string,
    kaszt: string
  ) {
    const charData: CharModel = {
      _id: '',
      creatorName: creatorName,
      creatorID: creatorID,
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
    creatorID: string,
    nev: string,
    kaszt: string
  ) {
    let charData: CharModel;
    charData = {
      _id: _id,
      creatorID: creatorID,
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
