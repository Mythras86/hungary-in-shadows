import { Component, Input, Output } from '@angular/core';
import { SectionHeadService } from './section-head.service';

@Component({
  selector: 'app-section-head',
  templateUrl: './section-head.component.html',
  styleUrls: ['./section-head.component.css']
})
export class SectionHeadComponent {

  constructor(
    public headServ: SectionHeadService,
  ) {}

  @Input() subForm: string = '';
  @Input() headText: string = '';

  showMe(status: string):string {
    if (this.headServ.showMeSatus == 'none') {
      return this.headServ.showMeSatus = status;
    }
    if (this.headServ.showMeSatus != 'none' && this.headServ.showMeSatus != status ) {
      return this.headServ.showMeSatus = status;
    }
    return this.headServ.showMeSatus = 'none';
  }

}
