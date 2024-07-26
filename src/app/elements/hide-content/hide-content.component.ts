import { Component, Input } from '@angular/core';
import { HideService } from './hide-content.service';

@Component({
  selector: 'app-hide-content',
  templateUrl: './hide-content.component.html',
  styleUrls: ['./hide-content.component.scss'],
})
export class HideContentComponent {

  constructor(
    public s: HideService
  ) {}

  @Input() keyWord: string = '';
  @Input() defaultShow: string = '';

  @Input() arrowColor: string = '';
  @Input() arrowBefore: boolean = true;

}
