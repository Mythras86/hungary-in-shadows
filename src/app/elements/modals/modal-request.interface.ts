import { Type } from '@angular/core';
import { AModal } from './modal.abstract';

export interface ModalRequest {
  type: Type<AModal>;
  modalData: any | null;
}
