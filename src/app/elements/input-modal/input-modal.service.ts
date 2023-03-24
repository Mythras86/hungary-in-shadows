import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DetailsService } from 'src/app/characters/chars-main/chars-subforms/details/details.service';

@Injectable({
  providedIn: 'root'
})
export class InputModalService {

  constructor(
    public detailsServ: DetailsService
  ) { }

  public modalStatus:boolean = false;

  nev: string = '';
  megjegyz: string = '';
  fcName: any = '';

  openModal(nev:string, megjegyz:string, fcName:any,) {
    this.modalStatus = true;
    this.nev = nev;
    this.megjegyz = megjegyz;
    this.fcName = fcName;
  }

  saveValue():void {
    const modalInput = document.getElementById('modalInput') as HTMLInputElement;
    this.fcName.patchValue(modalInput.value);
    this.modalStatus = false;
  }

  closeModal() {
    this.modalStatus = false;
  }

}
