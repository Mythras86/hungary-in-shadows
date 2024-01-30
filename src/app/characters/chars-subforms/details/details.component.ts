import { Component, OnInit } from '@angular/core';
import { DetailsService } from './details.service';
import { InpDetailsService } from 'src/app/elements/Inputs/inp-details/inp-details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    public detailsS: DetailsService,
    public inpDetailsS: InpDetailsService
   ) {}

   selected: string = '';

   onSelect(fcName: string):void {
    if (this.selected == '' || this.selected !== fcName) {
      this.selected = fcName;
    } else {
      this.selected = '';
    }
   }

  ngOnInit(): void {
  }

}
