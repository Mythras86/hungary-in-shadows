import { TestBed } from '@angular/core/testing';

import { CharsMainService } from './chars-main.service';

describe('CharsService', () => {
  let service: CharsMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharsMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
