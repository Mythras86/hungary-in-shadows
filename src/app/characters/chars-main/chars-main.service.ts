import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CharModel } from './chars-main.model';
import { FormGroup } from '@angular/forms';
import { SkillsModel } from '../chars-subforms/skills/skills.model';
import { ItemsModel } from '../chars-subforms/items/items.model';
import { AuthService } from 'src/app/authentication/auth.service';

const BACKEND_URL = environment.apiUrl + "/char/";

@Injectable({
  providedIn: 'root'
})
export class CharsMainService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authS: AuthService
  ) { }

  mainCharForm!: FormGroup;

  getOneChar(_id: string) {
    return this.http.get<{
      _id: string,
      creatorId: string,
      //szöveges
      teljesnev: string,
      becenev: string,
      alnev: string,
      testalkat: string,
      hajstilus: string,
      //értékválasztó
      nem: string,
      dns: string,
      anyanyelv: string,
      eletkor: number,
      magassag: number,
      testsuly: number,
      //szín
      szemszin: string,
      hajszin: string,
      szorszin: string,
      borszin: string,
      kedvencszin: string,
      //hosszú szöveg
      felelem: string,
      osztonzo: string,
      gyulolet: string,
      kedvenc: string,
      irtozat: string,
      vonzalom: string,
      megjelenes: string,
      //erőforrások
      alapKarma: number,
      szerzettKarma: number,
      elkoltottKarma: number,
      alapToke: number,
      szerzettToke: number,
      elkoltottToke: number,
      //fizikai
      fizEro: number,
      fizGyo: number,
      fizUgy: number,
      fizKit: number,
      //asztrál
      asztEro: number,
      asztGyo: number,
      asztUgy: number,
      asztKit: number,
      //speciális
      kockatartalek: number,
      magia: number,
      chi: number,
      cyberCapacity: number,
      //konstans
      esszencia: number,
      // állapot
      asztralisAllapot: number,
      fizikaiAllapot: number,
      pinhentsegAllapot: number,
      taplaltsagAllapot: number,
      // szakértelmek
      skills: Array<SkillsModel>,
      items: Array<ItemsModel>
      }>(BACKEND_URL +_id);
  }

  addOneChar(
    creatorId: string,
    //szöveges
    teljesnev: string,
    becenev: string,
    alnev: string,
    testalkat: string,
    hajstilus: string,
    //értékválasztó
    nem: string,
    dns: string,
    anyanyelv: string,
    eletkor: number,
    magassag: number,
    testsuly: number,
    //szín
    szemszin: string,
    hajszin: string,
    szorszin: string,
    borszin: string,
    kedvencszin: string,
    //hosszú szöveg
    felelem: string,
    osztonzo: string,
    gyulolet: string,
    kedvenc: string,
    irtozat: string,
    vonzalom: string,
    megjelenes: string,
    //erőforrások
    alapKarma: number,
    szerzettKarma: number,
    elkoltottKarma: number,
    alapToke: number,
    szerzettToke: number,
    elkoltottToke: number,
    //fizikai
    fizEro: number,
    fizGyo: number,
    fizUgy: number,
    fizKit: number,
    //asztrál
    asztEro: number,
    asztGyo: number,
    asztUgy: number,
    asztKit: number,
    //speciális
    kockatartalek: number,
    magia: number,
    chi: number,
    cyberCapacity: number,
    //konstans
    esszencia: number,
    // állapot
    asztralisAllapot: number,
    fizikaiAllapot: number,
    pinhentsegAllapot: number,
    taplaltsagAllapot: number,
    // szakértelmek
    skills: Array<SkillsModel>,
    items: Array<ItemsModel>
  ) {
    const charData:CharModel = {
      creatorId: this.authS.getUserId(),
      //szöveges
      teljesnev: teljesnev,
      becenev: becenev,
      alnev: alnev,
      testalkat: testalkat,
      hajstilus: hajstilus,
      //értékválasztó
      nem: nem,
      dns: dns,
      anyanyelv: anyanyelv,
      eletkor: eletkor,
      magassag: magassag,
      testsuly: testsuly,
      //szín
      szemszin: szemszin,
      hajszin: hajszin,
      szorszin: szorszin,
      borszin: borszin,
      kedvencszin: kedvencszin,
      //hosszú szöveg
      felelem: felelem,
      osztonzo: osztonzo,
      gyulolet: gyulolet,
      kedvenc: kedvenc,
      irtozat: irtozat,
      vonzalom: vonzalom,
      megjelenes: megjelenes,
      //erőforrások
      alapKarma: alapKarma,
      szerzettKarma: szerzettKarma,
      elkoltottKarma: elkoltottKarma,
      alapToke: alapToke,
      szerzettToke: szerzettToke,
      elkoltottToke: elkoltottToke,
      //fizikai
      fizEro: fizEro,
      fizGyo: fizGyo,
      fizUgy: fizUgy,
      fizKit: fizKit,
      //asztrál
      asztEro: asztEro,
      asztGyo: asztGyo,
      asztUgy: asztUgy,
      asztKit: asztKit,
      //speciális
      kockatartalek: kockatartalek,
      magia: magia,
      chi: chi,
      cyberCapacity: cyberCapacity,
      //konstans
      esszencia: esszencia,
      // állapot
      asztralisAllapot: asztralisAllapot,
      fizikaiAllapot: fizikaiAllapot,
      pinhentsegAllapot: pinhentsegAllapot,
      taplaltsagAllapot: taplaltsagAllapot,
      // szakértelmek
      skills: skills,
      items: items,
    };
    this.http.post(BACKEND_URL + "new", charData).subscribe(response => {
      this.router.navigate(["/charslist"]);
    });
  }

  updateOneChar(
    _id: string,
    creatorId: string,
    //szöveges
    teljesnev: string,
    becenev: string,
    alnev: string,
    testalkat: string,
    hajstilus: string,
    //értékválasztó
    nem: string,
    dns: string,
    anyanyelv: string,
    eletkor: number,
    magassag: number,
    testsuly: number,
    //szín
    szemszin: string,
    hajszin: string,
    szorszin: string,
    borszin: string,
    kedvencszin: string,
    //hosszú szöveg
    felelem: string,
    osztonzo: string,
    gyulolet: string,
    kedvenc: string,
    irtozat: string,
    vonzalom: string,
    megjelenes: string,
    //erőforrások
    alapKarma: number,
    szerzettKarma: number,
    elkoltottKarma: number,
    alapToke: number,
    szerzettToke: number,
    elkoltottToke: number,
    //fizikai
    fizEro: number,
    fizGyo: number,
    fizUgy: number,
    fizKit: number,
    //asztrál
    asztEro: number,
    asztGyo: number,
    asztUgy: number,
    asztKit: number,
    //speciális
    kockatartalek: number,
    magia: number,
    chi: number,
    cyberCapacity: number,
    //konstans
    esszencia: number,
    // állapot
    asztralisAllapot: number,
    fizikaiAllapot: number,
    pinhentsegAllapot: number,
    taplaltsagAllapot: number,
    // szakértelmek
    skills: Array<SkillsModel>,
    items: Array<ItemsModel>,
  ) {
    let charData: CharModel;
    charData = {
      _id: _id,
      creatorId: creatorId,
      //szöveges
      teljesnev: teljesnev,
      becenev: becenev,
      alnev: alnev,
      testalkat: testalkat,
      hajstilus: hajstilus,
      //értékválasztó
      nem: nem,
      dns: dns,
      anyanyelv: anyanyelv,
      eletkor: eletkor,
      magassag: magassag,
      testsuly: testsuly,
      //szín
      szemszin: szemszin,
      hajszin: hajszin,
      szorszin: szorszin,
      borszin: borszin,
      kedvencszin: kedvencszin,
      //hosszú szöveg
      felelem: felelem,
      osztonzo: osztonzo,
      gyulolet: gyulolet,
      kedvenc: kedvenc,
      irtozat: irtozat,
      vonzalom: vonzalom,
      megjelenes: megjelenes,
      //erőforrások
      alapKarma: alapKarma,
      szerzettKarma: szerzettKarma,
      elkoltottKarma: elkoltottKarma,
      alapToke: alapToke,
      szerzettToke: szerzettToke,
      elkoltottToke: elkoltottToke,
      //fizikai
      fizEro: fizEro,
      fizGyo: fizGyo,
      fizUgy: fizUgy,
      fizKit: fizKit,
      //asztrál
      asztEro: asztEro,
      asztGyo: asztGyo,
      asztUgy: asztUgy,
      asztKit: asztKit,
      //speciális
      kockatartalek: kockatartalek,
      magia: magia,
      chi: chi,
      cyberCapacity: cyberCapacity,
      //konstans
      esszencia: esszencia,
      // állapot
      asztralisAllapot: asztralisAllapot,
      fizikaiAllapot: fizikaiAllapot,
      pinhentsegAllapot: pinhentsegAllapot,
      taplaltsagAllapot: taplaltsagAllapot,
      // szakértelmek
      skills: skills,
      // felszerelés
      items: items
      };
      this.http
      .put(BACKEND_URL +_id, charData)
      .subscribe(response => {
      this.router.navigate(["/charslist"]);
    });
  }

}
