import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../elements/spinner/spinner.service';
import { HideService } from '../elements/hide-content/hide-content.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    public spinServ: SpinnerService,
    public hide: HideService,
  ) {}

  ngOnInit(): void {
    this.spinServ.toggleSpinner(false);
  }
}
