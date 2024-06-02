import { Component, OnInit } from '@angular/core';
import { StatusService } from './status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  constructor(
    public s: StatusService,
  ) {}


  ngOnInit(): void {
  }

}
