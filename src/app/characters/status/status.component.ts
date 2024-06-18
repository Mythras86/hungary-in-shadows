import { Component, OnInit } from '@angular/core';
import { StatusService } from './status.service';
import { StatusmonitorService } from './statusmonitor/statusmonitor.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  constructor(
    public s: StatusService,
    private statusMonS: StatusmonitorService,
  ) {
    this.modifiers = this.getModifiers();
  }
  modifiers: number = 0;

  getModifiers(): number {
    return this.statusMonS.getModifiers(this.s.getFc('asztralisAllapot')?.value, this.s.getFc('fizikaiAllapot')?.value)
  }

  ngOnInit(): void {
    this.s.statusForm.valueChanges.subscribe(
      ()=> this.modifiers = this.getModifiers()
    );
  }

}
