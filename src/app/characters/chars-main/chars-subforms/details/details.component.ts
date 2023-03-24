import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputModalService } from 'src/app/elements/input-modal/input-modal.service';
import { detailsUtil} from './details-utility';
import { DetailsService } from './details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class CharDetailsComponent implements OnInit {

  constructor(
    public detailsServ: DetailsService,
    public inputModServ: InputModalService,
  ) {}

  public edit: boolean = false;

  getDetailsUtil():any {
    return detailsUtil;
  }

  getValue(fcname: string) {
    return this.detailsServ.detailsForm.get(fcname)?.value;
  }

  toggleEdit(): boolean {
    return this.edit = !this.edit
  }

  getForm(): FormGroup {
    return this.detailsServ.detailsForm;
  }

  getFcValue(fcname: string):FormControl {
    return this.detailsServ.detailsForm.get(fcname)?.value;
  }

  getFcPath(fcname: string):any {
    let fc = this.detailsServ.detailsForm.get(fcname);
    return fc;
  }


  ngOnInit(): void {
    this.detailsServ.createDetails();
  }

}
