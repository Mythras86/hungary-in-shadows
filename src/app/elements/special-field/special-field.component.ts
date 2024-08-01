import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-field',
  templateUrl: './special-field.component.html',
  styleUrls: ['./special-field.component.scss']
})
export class SpecialFieldComponent implements OnInit {

  constructor() {
    this.fieldsUtil = [
      {nev: 'karma', egyseg: '&#x262F;'},
      {nev: 'toke', egyseg: 'N&#165;'},
      {nev: 'esszencia', egyseg: '&#8364;'},
      {nev: 'pancel', egyseg: '&#9820;'},
      {nev: 'szint', egyseg: '&starf;'},
      {nev: 'sebzes', egyseg: '&#9876;'},
      {nev: 'suly', egyseg: 'Kg'},
      {nev: 'akcio', egyseg: 'AP'},
    ];
  }

  @Input() ertek: any;
  @Input() tipus: string = '';
  @Input() egyeniEgyseg: any;
  @Input() egyeniSzin: string = '';

  fieldsUtil: Array<any> = [];

  szin: string = 'grayCell';
  egyseg: any = '';

  setEgyseg(): void {
    if (this.tipus == '') {
      this.egyseg == '';
    } else {
      const specField = this.fieldsUtil.filter(x=>x.nev == this.tipus)[0];
      if (this.egyeniEgyseg) {
        this.egyseg = this.egyeniEgyseg;
      } else {
        this.egyseg = specField.egyseg;
      }
      if (this.egyeniSzin != '') {
        this.szin = this.egyeniSzin;
      } else {
        this.szin = specField.nev;
      }
    }
  }


  ngOnInit(): void {
    this.setEgyseg();
  }

}
