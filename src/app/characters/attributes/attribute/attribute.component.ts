import { Component, Input, OnInit } from '@angular/core';
import { AttributesService } from '../attributes.service';
import { attributesUtil } from '../attributes-utility';
import { DetailsService } from '../../details/details.service';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  @Input() fcName: string = '';
  @Input() nev: string = '';
  szint: number = 0;
  modosito: number = 0;
  dnsMod: number = 0;

  constructor(
    private attrS: AttributesService,
    private detailsS: DetailsService,
  ) {
  }

  ngOnInit(): void {
    this.szint = this.attrS.getFc(this.fcName)?.value;
    this.modosito  = this.attrS.getMod(this.fcName);
    this.dnsMod = this.attrS.getDnsMod(this.fcName);
    this.attrS.attributesForm?.valueChanges.subscribe(
      ()=>
        this.szint = this.attrS.getFc(this.fcName)?.value,
    );
    this.detailsS.detailsForm.get('dns')?.valueChanges.subscribe(
      ()=> this.dnsMod = this.attrS.getDnsMod(this.fcName)
    );
  }
}
