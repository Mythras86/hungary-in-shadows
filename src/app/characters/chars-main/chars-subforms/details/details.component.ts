import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Fajok, detailsUtil} from './details-utility';
import { DetailsService } from './details.service';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { InputModalComponent } from 'src/app/elements/modals/input-modal/input-modal.component';
import { __values } from 'tslib';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class CharDetailsComponent implements OnInit {

  constructor(
    public detailsServ: DetailsService,
    private modalServ: ModalService,
  ) {}

  public edit: boolean = false;

  getDetailsUtil():any {
    return detailsUtil;
  }

  getValue(fcName: string) {
    return this.detailsServ.detailsForm.get(fcName)?.value;
  }

  toggleEdit(): boolean {
    return this.edit = !this.edit
  }

  getForm(): FormGroup {
    return this.detailsServ.detailsForm;
  }

  getFcValue(fcName: string):FormControl {
    return this.detailsServ.detailsForm.get(fcName)?.value;
  }

  getFcPath(fcName: string):any {
    let fc = this.detailsServ.detailsForm.get(fcName);
    return fc;
  }

  getDefault(fcName: string):any {
    const valasztottFaj: string = this.detailsServ.detailsForm.get('fajta')?.value
    if (valasztottFaj !== '') {
      if (fcName == 'eletkor') {
        const defAge = Fajok.filter(x=>x.fajnev = valasztottFaj).map(x=>x.defAge)[0];
        return defAge;
      }
      if (fcName == 'magassag') {
        const defHeight = Fajok.filter(x=>x.fajnev = valasztottFaj).map(x=>x.defHeight)[0];
        return defHeight;
      }
      if (fcName == 'testsuly') {
        const defWieght = Fajok.filter(x=>x.fajnev = valasztottFaj).map(x=>x.defWieght)[0];
        return defWieght;
      }
      if (fcName == 'kepessegek') {
        const kepessegek = Fajok.filter(x=>x.fajnev = valasztottFaj).map(x=>x.defKepessegek)[0];
        return kepessegek;
      }
    }
    return null;
  }

  sendData(fcName:string, tipus:string, fejlec:string, megjegyzes:string, ertek: any) {
    this.modalServ.openModal(InputModalComponent, {tipus: tipus, fejlec: fejlec, megjegyzes: megjegyzes, ertek: ertek}).subscribe(
      w => this.updateData(fcName, w)
    );
  }

  updateData(fcName:any, value:any) {
    return this.detailsServ.detailsForm.get(fcName)?.patchValue(value);
  }

  ngOnInit(): void {
    this.detailsServ.createDetails();
  }

}
