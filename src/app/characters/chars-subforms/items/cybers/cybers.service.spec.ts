import { TestBed } from '@angular/core/testing';

import { CybersService } from './cybers.service';

describe('CybersService', () => {
  let service: CybersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CybersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
