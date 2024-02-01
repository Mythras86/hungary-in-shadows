import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CharModel } from './chars-main.model';
import { AuthService } from 'src/app/authentication/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SkillsModel } from '../chars-subforms/skills/skills.model';
import { ArmorsModel } from '../chars-subforms/armors/armors.model';
import { ArtifactsModel } from '../chars-subforms/artifacts/artifacts.model';
import { CybersModel } from '../chars-subforms/cybers/cybers.model';
import { ExplosivesModel } from '../chars-subforms/explosives/explosives.model';
import { SpellsModel } from '../chars-subforms/spells/spells.model';
import { SpiritsModel } from '../chars-subforms/spirits/spirits.model';
import { ToolsModel } from '../chars-subforms/tools/tools.model';
import { WeaponsModel } from '../chars-subforms/weapons/weapons.model';

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
      szabadKarma: number,
      szabadToke: number,
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
      // állapot
      asztralisAllapot: number,
      fizikaiAllapot: number,
      pinhentsegAllapot: number,
      taplaltsagAllapot: number,
      armorLevel: number,
      // szakértelmek
      skills: Array<SkillsModel>,
      // páncélok
      armors: Array<ArmorsModel>,
      // ereklyék
      artifacts: Array<ArtifactsModel>,
      // kiberverek
      cybers: Array<CybersModel>,
      // robbanószerek
      explosives: Array<ExplosivesModel>,
      // varázslatok
      spells: Array<SpellsModel>,
      // szellemek
      spirits: Array<SpiritsModel>,
      // eszközök
      tools: Array<ToolsModel>,
      // fegyverek
      weapons: Array<WeaponsModel>,
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
    szabadKarma: number,
    szabadToke: number,
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
    // állapot
    asztralisAllapot: number,
    fizikaiAllapot: number,
    pinhentsegAllapot: number,
    taplaltsagAllapot: number,
    armorLevel: number,
    // szakértelmek
    skills: Array<SkillsModel>,
    // páncélok
    armors: Array<ArmorsModel>,
    // ereklyék
    artifacts: Array<ArtifactsModel>,
    // kiberverek
    cybers: Array<CybersModel>,
    // robbanószerek
    explosives: Array<ExplosivesModel>,
    // varázslatok
    spells: Array<SpellsModel>,
    // szellemek
    spirits: Array<SpiritsModel>,
    // eszközök
    tools: Array<ToolsModel>,
    // fegyverek
    weapons: Array<WeaponsModel>,
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
      szabadKarma: szabadKarma,
      szabadToke: szabadToke,
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
      armorLevel: armorLevel,
      // állapot
      asztralisAllapot: asztralisAllapot,
      fizikaiAllapot: fizikaiAllapot,
      pinhentsegAllapot: pinhentsegAllapot,
      taplaltsagAllapot: taplaltsagAllapot,
      // szakértelmek
      skills: skills,
      // páncélok
      armors: armors,
      // ereklyék
      artifacts: artifacts,
      // kiberverek
      cybers: cybers,
      // robbanószerek
      explosives: explosives,
      // varázslatok
      spells: spells,
      // szellemek
      spirits: spirits,
      // eszközök
      tools: tools,
      // fegyverek
      weapons: weapons,
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
    szabadKarma: number,
    szabadToke: number,
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
    // állapot
    asztralisAllapot: number,
    fizikaiAllapot: number,
    pinhentsegAllapot: number,
    taplaltsagAllapot: number,
    armorLevel: number,
    // szakértelmek
    skills: Array<SkillsModel>,
    // páncélok
    armors: Array<ArmorsModel>,
    // ereklyék
    artifacts: Array<ArtifactsModel>,
    // kiberverek
    cybers: Array<CybersModel>,
    // robbanószerek
    explosives: Array<ExplosivesModel>,
    // varázslatok
    spells: Array<SpellsModel>,
    // szellemek
    spirits: Array<SpiritsModel>,
    // eszközök
    tools: Array<ToolsModel>,
    // fegyverek
    weapons: Array<WeaponsModel>,
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
      szabadKarma: szabadKarma,
      szabadToke: szabadToke,
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
      // állapot
      asztralisAllapot: asztralisAllapot,
      fizikaiAllapot: fizikaiAllapot,
      pinhentsegAllapot: pinhentsegAllapot,
      taplaltsagAllapot: taplaltsagAllapot,
      armorLevel: armorLevel,
      // szakértelmek
      skills: skills,
      // páncélok
      armors: armors,
      // ereklyék
      artifacts: artifacts,
      // kiberverek
      cybers: cybers,
      // robbanószerek
      explosives: explosives,
      // varázslatok
      spells: spells,
      // szellemek
      spirits: spirits,
      // eszközök
      tools: tools,
      // fegyverek
      weapons: weapons,
      };
    this.http
      .put(BACKEND_URL +_id, charData)
      .subscribe(response => {
      this.router.navigate(["/charslist"]);
    });
  }

}
