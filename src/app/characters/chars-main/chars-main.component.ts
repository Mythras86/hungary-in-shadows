import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { SectionHeadService } from 'src/app/elements/section-head/section-head.service';
import { SpinnerService } from 'src/app/elements/spinner/spinner.service';
import { CharsMainService } from './chars-main.service';
import { DetailsService } from './chars-subforms/details/details.service';
import {ResourcesService } from './chars-subforms/resources/resources.service';

@Component({
  selector: 'app-chars-main',
  templateUrl: './chars-main.component.html',
  styleUrls: ['./chars-main.component.css']
})
export class CharsMainComponent implements OnInit, OnDestroy {

  constructor (
    private charServ: CharsMainService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public authServ: AuthService,
    public spinServ: SpinnerService,
    public headServ: SectionHeadService,

    private detailsServ: DetailsService,
    private resServ:ResourcesService
    ) {}

  mainCharForm!: FormGroup;
  private authStatusSub!: Subscription;

  public mode:string = 'create';
  public _id:string = '';


  prepMainForm(): void {
    this.mainCharForm = this.fb.group({
     _id: [''],
      creatorName: [this.authServ.getUserName()],
      creatorId: [this.authServ.getUserId()],
      detailsForm: this.detailsServ.detailsForm,
      resourcesForm: this.resServ.resourcesForm,
    });
  }

  createNewChar() {
    var form = this.mainCharForm;
    if (form.invalid) {
      return;
    }
    this.spinServ.toggleSpinner(true);
    if (this.mode === 'create') {
      this.charServ.addOneChar(
        form.value._id,
        form.value.creatorName,
        form.value.creatorId,
        form.value.teljesnev,
        form.value.becenev,
        form.value.alnev,
        form.value.testalkat,
        form.value.hajstilus,
        form.value.megjelenes,
        form.value.nem,
        form.value.genek,
        form.value.anyanyelv,
        form.value.eletkor,
        form.value.magassag,
        form.value.testsuly,
        form.value.szemszin,
        form.value.hajszin,
        form.value.szorszin,
        form.value.borszin,
        form.value.felelem,
        form.value.osztonzo,
        form.value.gyulolet,
        form.value.kedvenc,
        form.value.irtozat,
        form.value.vonzalom,
      );
    } else {
      this.charServ.updateOneChar(
        form.value._id,
        form.value.creatorName,
        form.value.creatorId,
        form.value.teljesnev,
        form.value.becenev,
        form.value.alnev,
        form.value.testalkat,
        form.value.hajstilus,
        form.value.megjelenes,
        form.value.nem,
        form.value.genek,
        form.value.anyanyelv,
        form.value.eletkor,
        form.value.magassag,
        form.value.testsuly,
        form.value.szemszin,
        form.value.hajszin,
        form.value.szorszin,
        form.value.borszin,
        form.value.felelem,
        form.value.osztonzo,
        form.value.gyulolet,
        form.value.kedvenc,
        form.value.irtozat,
        form.value.vonzalom,
      );
    }
    this.router.navigate(["/charslist"]);
  }

  backToList() {
    this.router.navigate(["/charslist"]);
  }

  ngOnInit(): void {
    this.spinServ.toggleSpinner(false);
    this.authStatusSub = this.authServ
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.spinServ.toggleSpinner(true);
    });
    this.spinServ.toggleSpinner(false);
    this.prepMainForm();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('_id')) {
        this.mode = 'edit';
        this._id = paramMap.get('_id')!;
        this.spinServ.toggleSpinner(true);
        this.charServ.getOneChar(this._id).subscribe(w => {
          this.spinServ.toggleSpinner(false);
          this.mainCharForm = this.fb.group({
            _id: w._id,
            creatorName: w.creatorName,
            creatorId: w.creatorId,
            teljesnev: w.teljesnev,
            becenev: w.becenev,
            alnev: w.alnev,
            testalkat: w.testalkat,
            hajstilus: w.hajstilus,
            megjelenes: w.megjelenes,
            nem: w.nem,
            genek: w.genek,
            anyanyelv: w.anyanyelv,
            eletkor: w.eletkor,
            magassag: w.magassag,
            testsuly: w.testsuly,
            szemszin: w.szemszin,
            hajszin: w.hajszin,
            szorszin: w.szorszin,
            borszin: w.borszin,
            felelem: w.felelem,
            osztonzo: w.osztonzo,
            gyulolet: w.gyulolet,
            kedvenc: w.kedvenc,
            irtozat: w.irtozat,
            vonzalom: w.vonzalom,
          });
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
