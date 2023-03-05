import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/users/auth.service';
import { CharsService } from '../chars.service';

@Component({
  selector: 'app-create-char',
  templateUrl: './create-char.component.html',
  styleUrls: ['./create-char.component.css']
})
export class CreateCharComponent implements OnInit {

  constructor (
    private charServ: CharsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public authServ: AuthService
  ) {}

  mainCharForm!: FormGroup;

  public mode:string = 'create';
  public charID:string = '';

  createNewChar() {
    var form = this.mainCharForm;
    if (form.invalid) {
      return;
    }
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
    this.router.navigate(["/chars"]);
  }


  ngOnInit(): void {
    this.mainCharForm = this.fb.group({
      _id: [''],
      creatorName: [this.authServ.getUserName()],
      creatorId: [this.authServ.getUserId()],
      nev: [''],
      kaszt: [''],
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('_id')) {
        this.mode = 'edit';
        this.charID = paramMap.get('_id')!;
        this.charServ.getOneChar(this.charID).subscribe(w => {
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
        this.charID = '';
      }
    });
  }

  backToList() {
    this.router.navigate(["/chars"]);
  }

}
