import { Component, OnInit } from '@angular/core';
import { DetailsService } from './details.service';
import { InpDetailsService } from 'src/app/elements/Inputs/inp-details/inp-details.service';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    public s: DetailsService,
    public select: ItemSelectService,
    public inpDetS: InpDetailsService
   ) {}

  ngOnInit(): void {
  }

}
