import { Component, Input } from '@angular/core';
import { InputModalService } from './input-modal.service';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.css']
})
export class InputModalComponent {

  constructor(
    public inputModServ: InputModalService
  ) {}

}
