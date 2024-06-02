import { Component, OnInit } from '@angular/core';
import { StatusService } from './status.service';
import { AttributesService } from '../attributes/attributes.service';
import { DetailsService } from '../details/details.service';
import { ResourcesService } from '../resources/resources.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  constructor(
    public s: StatusService,
    public attrServ: AttributesService,
    public detailsServ: DetailsService,
    public resServ: ResourcesService,
  ) {}


  ngOnInit(): void {
  }

}
