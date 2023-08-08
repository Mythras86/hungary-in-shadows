import { ArmorsModel } from "../chars-subforms/armors/armors.model";
import { ArtifactsModel } from "../chars-subforms/artifacts/artifacts.model";
import { CybersModel } from "../chars-subforms/cybers/cybers.model";
import { ExplosivesModel } from "../chars-subforms/explosives/explosives.model";
import { SpellsModel } from "../chars-subforms/spells/spells.model";
import { SpiritsModel } from "../chars-subforms/spirits/spirits.model";
import { ToolsModel } from "../chars-subforms/tools/tools.model";
import { WeaponsModel } from "../chars-subforms/weapons/weapons.model";

export interface CharModel {

  _id: string;
  creatorName: string;
  creatorId: string;
  //szöveges
  teljesnev: string,
  becenev:string,
  alnev:string,
  testalkat:string,
  hajstilus:string,
  //értékválasztó
  nem: string,
  dns:string,
  anyanyelv: string,
  eletkor:number,
  magassag:number,
  testsuly:number,
  //szín
  szemszin:string,
  hajszin:string,
  szorszin:string,
  borszin:string,
  kedvencszin:string,
  //hosszú szöveg
  felelem:string,
  osztonzo:string,
  gyulolet:string,
  kedvenc:string,
  irtozat:string,
  vonzalom:string,
  megjelenes:string,
  //erőforrások
  elkolthetoKarma: number,
  elkolthetoToke: number,
  karmabolToke: number
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
  skills: Array<any>,
  // állapot
  asztralisAllapot: number,
  fizikaiAllapot: number,
  pinhentsegAllapot: number,
  taplaltsagAllapot: number,
  armorLevel: number,
  // páncélok
  armors: Array<ArmorsModel>,
  // Ereklyék
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

}
