import { Component, OnInit } from '@angular/core';
import { StatusService } from './status.service';
import { StatusmonitorService } from './statusmonitor/statusmonitor.service';
import { AttributesService } from '../attributes/attributes.service';
import { ItemsService } from '../items/items.service';
import { ItemsModel } from '../items/items.model';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  constructor(
    public s: StatusService,
    public attrsS: AttributesService,
    public itemsS: ItemsService,
    private statusMonS: StatusmonitorService,
  ) {  }

  modifiers: number = 0;

  kezdemenyezes: number = 0;
  reakcio: number = 0;

  getModifiers(): void {
    const mods = this.statusMonS.getModifiers(this.s.getFc('asztralisAllapot')?.value, this.s.getFc('fizikaiAllapot')?.value);
    this.modifiers = mods;
  }

  getErtekek(): void {
    const kezd = this.attrsS.getTulErtek('kezdemenyezes');
    const reakcio = this.attrsS.getTulErtek('reakcio');
    this.kezdemenyezes = kezd;
    this.reakcio = reakcio;
  }

  colorMe(ertek: number): string {
    if (ertek < 0) {
      return 'nrd';
    }
    if (ertek == 0) {
      return 'nyllw';
    }
    return 'ngrn';
  }

  ngOnInit(): void {
    this.getModifiers();
    this.getErtekek();
    this.s.statusForm.valueChanges.subscribe(
      ()=> this.getModifiers()
    );
    this.attrsS.attributesForm.valueChanges.subscribe(
      ()=> this.getErtekek()
    );
  }

}
