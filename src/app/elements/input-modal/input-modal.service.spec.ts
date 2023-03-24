import { TestBed } from '@angular/core/testing';

import { InputModalService } from './input-modal.service';

describe('InputModalService', () => {
  let service: InputModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
