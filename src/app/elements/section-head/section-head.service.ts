import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectionHeadService {

  constructor() { }

  public subForm: string = ''
  public showMeSatus: string = 'none'
}
