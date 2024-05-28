import { Component, OnInit } from '@angular/core';
import { InitiativeService } from './initiative.service';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})
export class InitiativeComponent implements OnInit {

  constructor(
    public s: InitiativeService,
  ) {}

  public get players(): FormArray | null | any {
    if(!this.s.initForm) {
      return null;
    }
    return this.s.initForm.controls['players'] as FormArray;
  }

  ngOnInit(): void {
      this.s.createInitiative();
      this.s.addPlayer();
      this.s.addPlayer();
  }
}
