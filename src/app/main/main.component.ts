import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../elements/spinner/spinner.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    public spinServ: SpinnerService
  ) {}

  ngOnInit(): void {
    this.spinServ.spinnerOff();
  }
}
