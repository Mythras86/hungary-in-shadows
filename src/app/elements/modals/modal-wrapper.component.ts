import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, Injector, OnDestroy, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalRequest } from './modal-request.interface';
import { AModal } from './modal.abstract';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent implements OnDestroy, AfterViewInit {
  private openModalSubscription: Subscription;
  private closeEventSubscription: Subscription;

  public isShown: boolean;
  public modal!: AModal;

  public modalBackgroundId = 'modal-background'

  @ViewChild('insertionPoint', { read: ViewContainerRef })
  public insertionPoint!: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private modalService: ModalService,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.isShown = false;

    this.openModalSubscription = new Subscription();
    this.closeEventSubscription = new Subscription();
  }

  public modalReference!: ComponentRef<AModal>;

  private cleanUp(): void {
    const componentIndex = this.insertionPoint.indexOf(this.modalReference.hostView);
    this.insertionPoint.remove(componentIndex);
    this.closeEventSubscription.unsubscribe();
    this.isShown = false;
  }

  private onNextEvent(answer: any): void {
    this.modalService.onAnswerReceived(answer);
  }

  private onCloseEvent(): void {
    this.modalService.onComplete();
    this.cleanUp();
  }

  private subscribeToModalClosure(): void {
    this.closeEventSubscription = this.modal.closeEvent
      .subscribe(
        {
          next: this.onNextEvent.bind(this),
          complete: this.onCloseEvent.bind(this)
        }
      );
  }

  private setupModalComponent(modalRequest: ModalRequest): void {
    if (modalRequest === null) return;

    const factory = this.componentFactoryResolver.resolveComponentFactory(modalRequest.type);
    this.modalReference = this.insertionPoint.createComponent(factory, undefined, this.injector);

    this.modal = this.modalReference.instance;
    this.modal.loadData(modalRequest.modalData);

    this.subscribeToModalClosure();

    this.isShown = true;
    this.changeDetector.detectChanges();
  }

  public closeModalOnClickAway(event: MouseEvent): void {
    if (this.modal.canBeClosed !== true) {
      return;
    }

    if ((event.target as HTMLElement).id === this.modalBackgroundId) {
      this.onCloseEvent();
    }
  }

  public ngAfterViewInit(): void {
    this.openModalSubscription = this.modalService.nextModalData.subscribe({
      next: this.setupModalComponent.bind(this)
    })
  }

  public ngOnDestroy(): void {
    this.closeEventSubscription.unsubscribe();
    this.openModalSubscription.unsubscribe();
  }

}
