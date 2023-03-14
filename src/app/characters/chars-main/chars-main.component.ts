import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { SpinnerService } from 'src/app/elements/spinner/spinner.service';
import { CharsMainService } from './chars-main.service';

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
    public spinServ: SpinnerService
  ) {}

  mainCharForm!: FormGroup;
  private authStatusSub!: Subscription;

  prepMainForm(): void {
    this.mainCharForm = this.fb.group({
      _id: [''],
      creatorName: [this.authServ.getUserName()],
      creatorId: [this.authServ.getUserId()],
      nev: ['', Validators.required],
      kaszt: ['', Validators.required],
    });
  }

  public mode:string = 'create';
  public charId:string = '';

  createNewChar() {
    var form = this.mainCharForm;
    if (form.invalid) {
      return;
    }
    this.spinServ.spinnerOn();
    if (this.mode === 'create') {
      this.charServ.addOneChar(
        form.value._id,
        form.value.creatorName,
        form.value.creatorId,
        form.value.nev,
        form.value.kaszt,
      );
    } else {
      this.charServ.updateOneChar(
        form.value._id,
        form.value.creatorName,
        form.value.creatorId,
        form.value.nev,
        form.value.kaszt,
      );
    }
    this.router.navigate(["/charslist"]);
  }

  backToList() {
    this.router.navigate(["/charslist"]);
  }

  ngOnInit(): void {
    this.authStatusSub = this.authServ
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.spinServ.spinnerOff();
    });
    this.spinServ.spinnerOff();
    this.prepMainForm();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('_id')) {
        this.mode = 'edit';
        this.charId = paramMap.get('_id')!;
        this.spinServ.spinnerOn
        this.charServ.getOneChar(this.charId).subscribe(w => {
          this.spinServ.spinnerOff();
          this.mainCharForm = this.fb.group({
            _id: w._id,
            creatorName: w.creatorName,
            creatorId: w.creatorId,
            nev: w.nev,
            kaszt: w.kaszt,
          });
        });
      } else {
        this.mode = 'create';
        this.charId = '';
      }
    });
  }

  ngOnDestroy(): void {
      this.authStatusSub.unsubscribe();
  }

}
