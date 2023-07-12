import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CharModel } from './chars-main.model';
import { AuthService } from 'src/app/authentication/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SkillsModel } from '../chars-subforms/skills/skills.model';
import { ArmorsModel } from '../chars-subforms/armors/armors.model';

const BACKEND_URL = environment.apiUrl + "/char/";

@Injectable({
  providedIn: 'root'
})
export class CharsMainService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authServ: AuthService,
    private fb: FormBuilder,
  ) { }

  mainCharForm!: FormGroup;

  createMainForm(): void {
    this.mainCharForm = this.fb.group({
      _id: [''],
      creatorName: this.authServ.getUserName(),
      creatorId: this.authServ.getUserId(),
    });
  }

  getOneChar(_id: string) {
    return this.http.get<{
      _id: string,
      creatorName: string,
      creatorId: string;
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
      elkolthetoKarma: number,
      elkolthetoToke: number,
      karmabolToke: number,
      //fizikai
      fizEro: number,
      fizEroMod: number,
      fizGyo: number,
      fizGyoMod: number,
      fizUgy: number,
      fizUgyMod: number,
      fizKit: number,
      fizKitMod: number,
      //asztrál
      asztEro: number,
      asztEroMod: number,
      asztGyo: number,
      asztGyoMod: number,
      asztUgy: number,
      asztUgyMod: number,
      asztKit: number,
      asztKitMod: number,
      //speciális
      magia: number,
      esszencia: number,
      kockatartalek: number,
      kezdemenyezes: number,
      // szakértelmek
      skills: Array<SkillsModel>,
      // állapot
      asztralisAllapot: number,
      fizikaiAllapot: number,
      pinhentsegAllapot: number,
      taplaltsagAllapot: number,
      // páncélok
      armors: Array<ArmorsModel>
    }>(BACKEND_URL +_id);
  }

  addOneChar(
    _id: string,
    creatorName: string,
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
    elkolthetoKarma: number,
    elkolthetoToke: number,
    karmabolToke: number,
    //fizikai
    fizEro: number,
    fizEroMod: number,
    fizGyo: number,
    fizGyoMod: number,
    fizUgy: number,
    fizUgyMod: number,
    fizKit: number,
    fizKitMod: number,
    //asztrál
    asztEro: number,
    asztEroMod: number,
    asztGyo: number,
    asztGyoMod: number,
    asztUgy: number,
    asztUgyMod: number,
    asztKit: number,
    asztKitMod: number,
    //speciális
    magia: number,
    esszencia: number,
    kockatartalek: number,
    kezdemenyezes: number,
    // szakértelmek
    skills: Array<SkillsModel>,
    // állapot
    asztralisAllapot: number,
    fizikaiAllapot: number,
    pinhentsegAllapot: number,
    taplaltsagAllapot: number,
    // páncélok
    armors: Array<ArmorsModel>
  ) {
    const charData = {
      _id: '',
      creatorName: '',
      creatorId: '',
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
      elkolthetoKarma: elkolthetoKarma,
      elkolthetoToke: elkolthetoToke,
      karmabolToke: karmabolToke,
      //fizikai
      fizEro: fizEro,
      fizEroMod: fizEroMod,
      fizGyo: fizGyo,
      fizGyoMod: fizGyoMod,
      fizUgy: fizUgy,
      fizUgyMod: fizUgyMod,
      fizKit: fizKit,
      fizKitMod: fizKitMod,
      //asztrál
      asztEro: asztEro,
      asztEroMod: asztEroMod,
      asztGyo: asztGyo,
      asztGyoMod: asztGyoMod,
      asztUgy: asztUgy,
      asztUgyMod: asztUgyMod,
      asztKit: asztKit,
      asztKitMod: asztKitMod,
      //speciális
      magia: magia,
      esszencia: esszencia,
      kockatartalek: kockatartalek,
      kezdemenyezes: kezdemenyezes,
      // szakértelmek
      skills: skills,
      // állapot
      asztralisAllapot: asztralisAllapot,
      fizikaiAllapot: fizikaiAllapot,
      pinhentsegAllapot: pinhentsegAllapot,
      taplaltsagAllapot: taplaltsagAllapot,
      // páncélok
      armors: armors,
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
    elkolthetoKarma: number,
    elkolthetoToke: number,
    karmabolToke: number,
      //fizikai
    fizEro: number,
    fizEroMod: number,
    fizGyo: number,
    fizGyoMod: number,
    fizUgy: number,
    fizUgyMod: number,
    fizKit: number,
    fizKitMod: number,
    //asztrál
    asztEro: number,
    asztEroMod: number,
    asztGyo: number,
    asztGyoMod: number,
    asztUgy: number,
    asztUgyMod: number,
    asztKit: number,
    asztKitMod: number,
    //speciális
    magia: number,
    esszencia: number,
    kockatartalek: number,
    kezdemenyezes: number,
    // szakértelmek
    skills: Array<SkillsModel>,
    // állapot
    asztralisAllapot: number,
    fizikaiAllapot: number,
    pinhentsegAllapot: number,
    taplaltsagAllapot: number,
    // páncélok
    armors: Array<ArmorsModel>
  ) {
    let charData: CharModel;
    charData = {
      _id: _id,
      creatorId: creatorId,
      creatorName: creatorName,
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
      elkolthetoKarma: elkolthetoKarma,
      elkolthetoToke: elkolthetoToke,
      karmabolToke: karmabolToke,
          //fizikai
      fizEro: fizEro,
      fizEroMod: fizEroMod,
      fizGyo: fizGyo,
      fizGyoMod: fizGyoMod,
      fizUgy: fizUgy,
      fizUgyMod: fizUgyMod,
      fizKit: fizKit,
      fizKitMod: fizKitMod,
      //asztrál
      asztEro: asztEro,
      asztEroMod: asztEroMod,
      asztGyo: asztGyo,
      asztGyoMod: asztGyoMod,
      asztUgy: asztUgy,
      asztUgyMod: asztUgyMod,
      asztKit: asztKit,
      asztKitMod: asztKitMod,
      //speciális
      magia: magia,
      esszencia: esszencia,
      kockatartalek: kockatartalek,
      kezdemenyezes: kezdemenyezes,
      // szakértelmek
      skills: skills,
      // állapot
      asztralisAllapot: asztralisAllapot,
      fizikaiAllapot: fizikaiAllapot,
      pinhentsegAllapot: pinhentsegAllapot,
      taplaltsagAllapot: taplaltsagAllapot,
      // páncélok
      armors: armors,
      };
    this.http
      .put(BACKEND_URL +_id, charData)
      .subscribe(response => {
      this.router.navigate(["/charslist"]);
    });
  }

}
