import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { SpinnerService } from 'src/app/elements/spinner/spinner.service';
import { CharsMainService } from './chars-main.service';
import { DetailsService } from '../chars-subforms/details/details.service';
import { ResourcesService } from '../chars-subforms/resources/resources.service';
import { AttributesService } from '../chars-subforms/attributes/attributes.service';
import { SkillsService } from '../chars-subforms/skills/skills.service';
import { StatusService } from '../chars-subforms/status/status.service';
import { ArmorsService } from '../chars-subforms/armors/armors.service';
import { HideService } from 'src/app/elements/hide-content/hide-content.service';
import { ArtifactsService } from '../chars-subforms/artifacts/artifacts.service';
import { CybersService } from '../chars-subforms/cybers/cybers.service';
import { ExplosivesService } from '../chars-subforms/explosives/explosives.service';
import { SpellsService } from '../chars-subforms/spells/spells.service';
import { SpiritsService } from '../chars-subforms/spirits/spirits.service';
import { ToolsService } from '../chars-subforms/tools/tools.service';
import { WeaponsService } from '../chars-subforms/weapons/weapons.service';

@Component({
  selector: 'app-chars-main',
  templateUrl: './chars-main.component.html',
  styleUrls: ['./chars-main.component.css'],
  providers: [HideService]

})
export class CharsMainComponent implements OnInit, OnDestroy {

  constructor (
    public charServ: CharsMainService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public authServ: AuthService,
    public spinServ: SpinnerService,
    public hideServ: HideService,

    private armorsServ: ArmorsService,
    private artifactsServ: ArtifactsService,
    private attrServ: AttributesService,
    private cybersServ: CybersService,
    private detailsServ: DetailsService,
    private exploServ: ExplosivesService,
    private resServ: ResourcesService,
    public skillsServ: SkillsService,
    private spellsServ: SpellsService,
    private spiritsServ: SpiritsService,
    private statusServ: StatusService,
    private toolsServ: ToolsService,
    private weaponsServ: WeaponsService,
  ) {}

  mode:string = 'create';
  _id:string = '';
  filter: string = 'Nincs';

  userIsAuthenticated = false;
  userId: string = '';
  private authStatusSub!: Subscription;

  createFilter(): any {
    const savedFilter = localStorage.getItem('mainCharFilter');
    if (!savedFilter) {
      return localStorage.setItem('mainCharFilter', this.filter);
    }
    return this.filter = savedFilter;
  }

  setFilter(keyWord: string):void {
    localStorage.setItem('mainCharFilter', keyWord);
    this.filter = keyWord
  }

  createMainForm(): void {
    this.charServ.mainCharForm = this.fb.group({
      _id: [''],
      creatorName: this.authServ.getUserName(),
      creatorId: this.authServ.getUserId(),
    });
    this.weaponsServ.createWeapons();
    this.toolsServ.createTools();
    this.statusServ.createStatus();
    this.spiritsServ.createSpirits();
    this.spellsServ.createSpells();
    this.skillsServ.createSkills();
    this.resServ.createResources();
    this.exploServ.createExplosives();
    this.detailsServ.createDetails();
    this.cybersServ.createCybers();
    this.attrServ.createAttributes();
    this.artifactsServ.createArtifacts();
    this.armorsServ.createArmors();
  }


  getCreatorId():string {
    return this.charServ.mainCharForm.get('creatorId')?.value;
  }

  createNewChar() {
    const main = this.charServ.mainCharForm;
    const details = this.detailsServ.detailsForm;
    const res = this.resServ.resourcesForm;
    const attrs = this.attrServ.attributesForm;
    const skills = this.skillsServ.skillsForm;
    const status = this.statusServ.statusForm;
    const armors = this.armorsServ.armorsForm;
    const artifacts = this.artifactsServ.artifactsForm;
    const cybers = this.cybersServ.cybersForm;
    const explosives = this.exploServ.explosivesForm;
    const spells = this.spellsServ.spellsForm;
    const spirits = this.spiritsServ.spiritsForm;
    const tools = this.toolsServ.toolsForm;
    const weapons = this.weaponsServ.weaponsForm;
    if (main.invalid
     || details.invalid
     || res.invalid
     || attrs.invalid
    ) {
      console.log('invalid')
      return;
   }
   this.spinServ.toggleSpinner(true);
   if (this.mode === 'create') {
      this.charServ.addOneChar(
        main.value._id,
        main.value.creatorName,
        main.value.creatorId,
        //szöveges
        details.value.teljesnev,
        details.value.becenev,
        details.value.alnev,
        details.value.testalkat,
        details.value.hajstilus,
        //értékválasztó
        details.value.nem,
        details.value.dns,
        details.value.anyanyelv,
        details.value.eletkor,
        details.value.magassag,
        details.value.testsuly,
        //szín
        details.value.szemszin,
        details.value.hajszin,
        details.value.szorszin,
        details.value.borszin,
        details.value.kedvencszin,
        //hosszú szöveg
        details.value.felelem,
        details.value.osztonzo,
        details.value.gyulolet,
        details.value.kedvenc,
        details.value.irtozat,
        details.value.vonzalom,
        details.value.megjelenes,
        //erőforrások
        res.value.szabadKarma,
        res.value.szabadToke,
        res.value.karmabolToke,
        //fizikai
        attrs.value.fizEro,
        attrs.value.fizEroMod,
        attrs.value.fizGyo,
        attrs.value.fizGyoMod,
        attrs.value.fizUgy,
        attrs.value.fizUgyMod,
        attrs.value.fizKit,
        attrs.value.fizKitMod,
        //asztrál
        attrs.value.asztEro,
        attrs.value.asztEroMod,
        attrs.value.asztGyo,
        attrs.value.asztGyoMod,
        attrs.value.asztUgy,
        attrs.value.asztUgyMod,
        attrs.value.asztKit,
        attrs.value.asztKitMod,
        //speciális
        attrs.value.magia,
        attrs.value.esszencia,
        attrs.value.kockatartalek,
        attrs.value.kezdemenyezes,
        // állapot
        status.value.asztralisAllapot,
        status.value.fizikaiAllapot,
        status.value.pinhentsegAllapot,
        status.value.taplaltsagAllapot,
        status.value.armorLevel,
        // arrayok
        skills.value.skills,
        armors.value.armors,
        artifacts.value.artifacts,
        cybers.value.cybers,
        explosives.value.explosives,
        spells.value.spells,
        spirits.value.spirits,
        tools.value.tools,
        weapons.value.weapons
      );
   } else {
      this.charServ.updateOneChar(
        main.value._id,
        main.value.creatorName,
        main.value.creatorId,
        //szöveges
        details.value.teljesnev,
        details.value.becenev,
        details.value.alnev,
        details.value.testalkat,
        details.value.hajstilus,
        //értékválasztó
        details.value.nem,
        details.value.dns,
        details.value.anyanyelv,
        details.value.eletkor,
        details.value.magassag,
        details.value.testsuly,
        //szín
        details.value.szemszin,
        details.value.hajszin,
        details.value.szorszin,
        details.value.borszin,
        details.value.kedvencszin,
        //hosszú szöveg
        details.value.felelem,
        details.value.osztonzo,
        details.value.gyulolet,
        details.value.kedvenc,
        details.value.irtozat,
        details.value.vonzalom,
        details.value.megjelenes,
        //erőforrások
        res.value.szabadKarma,
        res.value.szabadToke,
        res.value.karmabolToke,
        //fizikai
        attrs.value.fizEro,
        attrs.value.fizEroMod,
        attrs.value.fizGyo,
        attrs.value.fizGyoMod,
        attrs.value.fizUgy,
        attrs.value.fizUgyMod,
        attrs.value.fizKit,
        attrs.value.fizKitMod,
        //asztrál
        attrs.value.asztEro,
        attrs.value.asztEroMod,
        attrs.value.asztGyo,
        attrs.value.asztGyoMod,
        attrs.value.asztUgy,
        attrs.value.asztUgyMod,
        attrs.value.asztKit,
        attrs.value.asztKitMod,
        //speciális
        attrs.value.magia,
        attrs.value.esszencia,
        attrs.value.kockatartalek,
        attrs.value.kezdemenyezes,
        // állapot
        status.value.asztralisAllapot,
        status.value.fizikaiAllapot,
        status.value.pinhentsegAllapot,
        status.value.taplaltsagAllapot,
        status.value.armorLevel,
        // arrayok
        skills.value.skills,
        armors.value.armors,
        artifacts.value.artifacts,
        cybers.value.cybers,
        explosives.value.explosives,
        spells.value.spells,
        spirits.value.spirits,
        tools.value.tools,
        weapons.value.weapons
      )};
    this.router.navigate(["/charslist"]);
  }

  backToList() {
    this.router.navigate(["/charslist"]);
  }

  ngOnInit(): void {
    this.createFilter();
    this.spinServ.toggleSpinner(false);
    this.userId = this.authServ.getUserId();
    this.userIsAuthenticated = this.authServ.getIsAuth();
    this.authStatusSub = this.authServ
    .getAuthStatusListener()
    .subscribe((isAuthenticated: boolean) => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authServ.getUserId();
      this.spinServ.toggleSpinner(true);
    });
    this.spinServ.toggleSpinner(false);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('_id')) {
        this.mode = 'edit';
        this._id = paramMap.get('_id')!;
        this.spinServ.toggleSpinner(true);
        this.charServ.getOneChar(this._id).subscribe(w => {
          this.spinServ.toggleSpinner(false);
          this.charServ.mainCharForm= this.fb.group ({
            _id: w._id,
            creatorName: w.creatorName,
            creatorId: w.creatorId
          });
          this.detailsServ.detailsForm= this.fb.group ({
            //szöveges
            teljesnev: w.teljesnev,
            becenev: w.becenev,
            alnev: w.alnev,
            testalkat: w.testalkat,
            hajstilus: w.hajstilus,
            //értékválasztó
            nem: w.nem,
            dns: w.dns,
            anyanyelv: w.anyanyelv,
            eletkor: w.eletkor,
            magassag: w.magassag,
            testsuly: w.testsuly,
            //szín
            szemszin: w.szemszin,
            hajszin: w.hajszin,
            szorszin: w.szorszin,
            borszin: w.borszin,
            kedvencszin: w.kedvencszin,
            //hosszú szöveg
            felelem: w.felelem,
            osztonzo: w.osztonzo,
            gyulolet: w.gyulolet,
            kedvenc: w.kedvenc,
            irtozat: w.irtozat,
            vonzalom: w.vonzalom,
            megjelenes: w.megjelenes
          });
          this.resServ.resourcesForm= this.fb.group ({
            //erőforrások
            szabadKarma: w.szabadKarma,
            szabadToke: w.szabadToke,
            karmabolToke: w.karmabolToke
          });
          this.attrServ.attributesForm= this.fb.group ({
            //fizikai
            fizEro: w.fizEro,
            fizEroMod: w.fizEroMod,
            fizGyo: w.fizGyo,
            fizGyoMod: w.fizGyoMod,
            fizUgy: w.fizUgy,
            fizUgyMod: w.fizUgyMod,
            fizKit: w.fizKit,
            fizKitMod: w.fizKitMod,
            //asztrál
            asztEro: w.asztEro,
            asztEroMod: w.asztEroMod,
            asztGyo: w.asztGyo,
            asztGyoMod: w.asztGyoMod,
            asztUgy: w.asztUgy,
            asztUgyMod: w.asztUgyMod,
            asztKit: w.asztKit,
            asztKitMod: w.asztKitMod,
            //speciális
            magia: w.magia,
            esszencia: w.esszencia,
            kockatartalek: w.kockatartalek,
            kezdemenyezes: w.kezdemenyezes
          });
          this.statusServ.statusForm = this.fb.group ({
            fizikaiAllapot: w.fizikaiAllapot,
            asztralisAllapot: w.asztralisAllapot,
            pinhentsegAllapot: w.pinhentsegAllapot,
            taplaltsagAllapot: w.taplaltsagAllapot,
            armorLevel: w.armorLevel
          })
          this.skillsServ.createSkills();
          this.skillsServ.skillsForm.addControl('skillsForm', new FormGroup({}));
          (this.skillsServ.skillsForm as FormGroup).addControl('skills', this.skillsServ.setSkills(w.skills));
          this.armorsServ.createArmors();
          this.armorsServ.armorsForm.addControl('armorsForm', new FormGroup({}));
          (this.armorsServ.armorsForm as FormGroup).addControl('armors', this.armorsServ.setArmors(w.armors));
          this.artifactsServ.createArtifacts();
          this.artifactsServ.artifactsForm.addControl('artifacts', new FormGroup({}));
          (this.artifactsServ.artifactsForm as FormGroup).addControl('artifacts', this.artifactsServ.setArtifacts(w.artifacts));
          this.cybersServ.createCybers();
          this.cybersServ.cybersForm.addControl('cybers', new FormGroup({}));
          (this.cybersServ.cybersForm as FormGroup).addControl('cybers', this.cybersServ.setCybers(w.cybers));
          this.exploServ.createExplosives();
          this.exploServ.explosivesForm.addControl('explosives', new FormGroup({}));
          (this.exploServ.explosivesForm as FormGroup).addControl('explosives', this.exploServ.setExplosives(w.explosives));
          this.spellsServ.createSpells();
          this.spellsServ.spellsForm.addControl('spellsForm', new FormGroup({}));
          (this.spellsServ.spellsForm as FormGroup).addControl('spells', this.spellsServ.setSpells(w.spells));
          this.spiritsServ.createSpirits();
          this.spiritsServ.spiritsForm.addControl('spiritsForm', new FormGroup({}));
          (this.spiritsServ.spiritsForm as FormGroup).addControl('spirits', this.spiritsServ.setSpirits(w.spirits));
          this.toolsServ.createTools();
          this.toolsServ.toolsForm.addControl('toolsForm', new FormGroup({}));
          (this.toolsServ.toolsForm as FormGroup).addControl('tools', this.toolsServ.setTools(w.tools));
          this.weaponsServ.createWeapons();
          this.weaponsServ.weaponsForm.addControl('weaponsForm', new FormGroup({}));
          (this.weaponsServ.weaponsForm as FormGroup).addControl('weapons', this.weaponsServ.setWeapons(w.weapons));
        });
      } else {
        this.mode = 'create';
        this._id = '';
        this.createMainForm();
        this.skillsServ.addFirstLanguage()
      }
    });
  }

  ngOnDestroy(): void {
      this.authStatusSub.unsubscribe();
  }

}
