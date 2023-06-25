import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { SectionHeadService } from 'src/app/elements/section-head/section-head.service';
import { SpinnerService } from 'src/app/elements/spinner/spinner.service';
import { CharsMainService } from './chars-main.service';
import { DetailsService } from '../chars-subforms/details/details.service';
import { ResourcesService } from '../chars-subforms/resources/resources.service';
import { AttributesService } from '../chars-subforms/attributes/attributes.service';
import { SkillsService } from '../chars-subforms/skills/skills.service';
import { StatusService } from '../chars-subforms/status/status.service';

@Component({
  selector: 'app-chars-main',
  templateUrl: './chars-main.component.html',
  styleUrls: ['./chars-main.component.css']
})
export class CharsMainComponent implements OnInit, OnDestroy {

  constructor (
    public charServ: CharsMainService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public authServ: AuthService,
    public spinServ: SpinnerService,
    public headServ: SectionHeadService,
    private detailsServ: DetailsService,
    private resServ: ResourcesService,
    private attrServ: AttributesService,
    private skillsServ: SkillsService,
    private statusServ: StatusService,
  ) {}

  mode:string = 'create';
  _id:string = '';

  userIsAuthenticated = false;
  userId: string = '';
  private authStatusSub!: Subscription;

  getCreatorId():string {
    return this.charServ.mainCharForm.get('creatorId')?.value;
  }

  createNewChar() {
    var main = this.charServ.mainCharForm;
    var details = this.detailsServ.detailsForm;
    var res = this.resServ.resourcesForm;
    var attrs = this.attrServ.attributesForm;
    var skills = this.skillsServ.skillsForm;
    var status = this.statusServ.statusForm;
    if (main.invalid
     || details.invalid
     || res.invalid
     || attrs.invalid
    ) {
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
        res.value.elkolthetoKarma,
        res.value.elkolthetoToke,
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
        attrs.value.magiaMod,
        attrs.value.esszencia,
        attrs.value.esszenciaMod,
        attrs.value.kockatartalek,
        attrs.value.kockatartalekMod,
        attrs.value.kezdemenyezes,
        attrs.value.kezdemenyezesMod,
        // szakértelmek
        skills.value.skills,
        // állapot
        status.value.asztralisAllapot,
        status.value.fizikaiAllapot,
        status.value.pinhentsegAllapot,
        status.value.taplaltsagAllapot,
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
        res.value.elkolthetoKarma,
        res.value.elkolthetoToke,
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
        attrs.value.magiaMod,
        attrs.value.esszencia,
        attrs.value.esszenciaMod,
        attrs.value.kockatartalek,
        attrs.value.kockatartalekMod,
        attrs.value.kezdemenyezes,
        attrs.value.kezdemenyezesMod,
        // szakértelmek
        skills.value.skills,
        // állapot
        status.value.asztralisAllapot,
        status.value.fizikaiAllapot,
        status.value.pinhentsegAllapot,
        status.value.taplaltsagAllapot,
      )};
    this.router.navigate(["/charslist"]);
  }

  backToList() {
    this.router.navigate(["/charslist"]);
  }

  ngOnInit(): void {
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
    this.charServ.createMainForm();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('_id')) {
        this.mode = 'edit';
        this._id = paramMap.get('_id')!;
        this.spinServ.toggleSpinner(true);
        this.charServ.getOneChar(this._id).subscribe(w => {
          this.spinServ.toggleSpinner(false);
          this.charServ.mainCharForm = this.fb.group({
            _id: w._id,
            creatorName: w.creatorName,
            creatorId: w.creatorId,
          });
          this.detailsServ.detailsForm = this.fb.group({
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
            megjelenes: w.megjelenes,
          });
          this.resServ.resourcesForm = this.fb.group({
            //erőforrások
            elkolthetoKarma: w.elkolthetoKarma,
            elkolthetoToke: w.elkolthetoToke,
            karmabolToke: w.karmabolToke,
          });
          this.attrServ.attributesForm = this.fb.group({
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
            magiaMod: w.magiaMod,
            esszencia: w.esszencia,
            esszenciaMod: w.esszenciaMod,
            kockatartalek: w.kockatartalek,
            kockatartalekMod: w.kockatartalekMod,
            kezdemenyezes: w.kezdemenyezes,
            kezdemenyezesMod: w.kezdemenyezesMod,
          });
          this.skillsServ.skillsForm.addControl('skillsForm', new FormGroup({}));
          (this.skillsServ.skillsForm.get('skillsForm') as FormGroup).addControl('skills', this.skillsServ.setSkills(w.skills));
          this.statusServ.statusForm = this.fb.group({
            fizikaiAllapot: w.fizikaiAllapot,
            asztralisAllapot: w.asztralisAllapot,
            pinhentsegAllapot: w.pinhentsegAllapot,
            taplaltsagAllapot: w.taplaltsagAllapot,
          })
        });
      } else {
        this.mode = 'create';
        this._id = '';
      }
    });
  }

  ngOnDestroy(): void {
      this.authStatusSub.unsubscribe();
  }

}
