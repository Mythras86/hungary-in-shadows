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

    return this.answerData;
  }

  public onAnswerReceived(answer: any): void {
    this.answerData.next(answer);
  }

  public onComplete(): void {
    this.answerData.complete();
  }
}
