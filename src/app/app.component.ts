import { Component } from '@angular/core';
import { SpinnerService } from './elements/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HungaryInShadows';
  constructor (
    public spinnerServ: SpinnerService
  ) {}
}
