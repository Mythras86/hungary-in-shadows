import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CharModel } from './chars-main.model';

const BACKEND_URL = environment.apiUrl + "/char/";

@Injectable({
  providedIn: 'root'
})
export class CharsMainService {

  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }


  getOneChar(_id: string) {
    return this.http.get<{
      _id: string,
      creatorName: string,
      creatorId: string,
      teljesnev: string,
      becenev:string,
      alnev:string,
      testalkat:string,
      hajstilus:string,
      szakall:string,
      nem: string,
      fajta:string,
      anyanyelv: string,
      eletkor:number,
      magassag:number,
      testsuly:number,
      szemszin:string,
      hajszin:string,
      szorszin:string,
      borszin:string,
      felelem:string,
      osztonzo:string,
      gyulolet:string,
      kedvenc:string,
      irtozat:string,
      vonzalom:string,
    }>(BACKEND_URL +_id);
  }

  addOneChar(
   _id: string,
    creatorName: string,
    creatorId: string,
    teljesnev: string,
    becenev:string,
    alnev:string,
    testalkat:string,
    hajstilus:string,
    szakall:string,
    nem: string,
    fajta:string,
    anyanyelv: string,
    eletkor:number,
    magassag:number,
    testsuly:number,
    szemszin:string,
    hajszin:string,
    szorszin:string,
    borszin:string,
    felelem:string,
    osztonzo:string,
    gyulolet:string,
    kedvenc:string,
    irtozat:string,
    vonzalom:string,
    ) {
    const charData: CharModel = {
      _id: '',
      creatorName: '',
      creatorId: '',
      teljesnev: teljesnev,
      becenev: becenev,
      alnev: alnev,
      testalkat: testalkat,
      hajstilus: hajstilus,
      szakall: szakall,
      nem: nem,
      fajta: fajta,
      anyanyelv: anyanyelv,
      eletkor: eletkor,
      magassag: magassag,
      testsuly: testsuly,
      szemszin: szemszin,
      hajszin: hajszin,
      szorszin: szorszin,
      borszin: borszin,
      felelem: felelem,
      osztonzo: osztonzo,
      gyulolet: gyulolet,
      kedvenc: kedvenc,
      irtozat: irtozat,
      vonzalom: vonzalom,
        };
    this.http.post<{ message: string; char: CharModel }>(
      BACKEND_URL + "create", charData).subscribe(response => {
        this.router.navigate(["/charslist"]);
      });
  }

  updateOneChar(
    _id: string,
    creatorName: string,
    creatorId: string,
    teljesnev: string,
    becenev:string,
    alnev:string,
    testalkat:string,
    hajstilus:string,
    szakall:string,
    nem: string,
    fajta:string,
    anyanyelv: string,
    eletkor:number,
    magassag:number,
    testsuly:number,
    szemszin:string,
    hajszin:string,
    szorszin:string,
    borszin:string,
    felelem:string,
    osztonzo:string,
    gyulolet:string,
    kedvenc:string,
    irtozat:string,
    vonzalom:string,
  ) {
    let charData: CharModel;
    charData = {
      _id:_id,
      creatorId: creatorId,
      creatorName: creatorName,
      teljesnev: teljesnev,
      becenev: becenev,
      alnev: alnev,
      testalkat: testalkat,
      hajstilus: hajstilus,
      szakall: szakall,
      nem: nem,
      fajta: fajta,
      anyanyelv: anyanyelv,
      eletkor: eletkor,
      magassag: magassag,
      testsuly: testsuly,
      szemszin: szemszin,
      hajszin: hajszin,
      szorszin: szorszin,
      borszin: borszin,
      felelem: felelem,
      osztonzo: osztonzo,
      gyulolet: gyulolet,
      kedvenc: kedvenc,
      irtozat: irtozat,
      vonzalom: vonzalom,
    };
      this.http
      .put(BACKEND_URL +_id, charData)
      .subscribe(response => {
        this.router.navigate(["/charslist"]);
      });
  }

}
