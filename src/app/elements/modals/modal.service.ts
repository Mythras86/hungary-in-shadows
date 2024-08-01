import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ModalRequest } from './modal-request.interface';
import { AModal } from './modal.abstract';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private nextModalDataSource = new BehaviorSubject<ModalRequest>(null!);
  public nextModalData = this.nextModalDataSource.asObservable();
  public answerData = new Subject<any>();

  constructor() { }

  public openModal(type: Type<AModal>, modalData: any): Subject<any> {

    this.nextModalDataSource.next({
      type,
      modalData
    } as ModalRequest);

    this.answerData = new Subject<any>();

    // háttér scroll tiltás
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";

    return this.answerData;
  }

  public onAnswerReceived(answer: any): void {
    this.answerData.next(answer);
  }

  public onComplete(): void {
    // háttér scroll engedés
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    this.answerData.complete();
  }
}
