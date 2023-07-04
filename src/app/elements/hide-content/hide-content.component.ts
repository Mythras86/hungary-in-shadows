import { Component, Input } from '@angular/core';
import { HideService } from './hide-content.service';

@Component({
  selector: 'app-hide-content',
  templateUrl: './hide-content.component.html',
  styleUrls: ['./hide-content.component.css'],
})
export class HideContentComponent {

  constructor(
    public hideServ: HideService
  ) {}

  @Input() keyWord: any;

  @Input() arrowClass: string = '';

}
