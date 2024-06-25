import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  @Input() nev: string = '';
  @Input() szint: number = 0;
  @Input() max: number = 0;
  @Input() modosito: number = 0;
  @Input() dnsMod: number = 0;
  @Input() teljesErtek: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }
}
